import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Backend_URL=import.meta.env.VITE_BURL
export default function Login() {
  
  const [inputFeild, setInputFeild] = useState({
    email: "",
    password: "",
  });
  

  const navigate = useNavigate();
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputFeild({ ...inputFeild, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!inputFeild.email || !inputFeild.password) {
        return errorMsg("input feild is required! ");
      }

      const { data } = await axios.post(
        `${Backend_URL}/user/login`,
        inputFeild
      );
      const { status, msg, token } = data;
      if (status === "error") {
        setTimeout(() => {
          navigate("/");
        }, 1000);

        return errorMsg(msg);
      }
      setTimeout(() => {
        navigate("/music");
      }, 1000);
      localStorage.setItem("token", JSON.stringify(token));
      return successMsg(msg);
    } catch (error) {
      return errorMsg("Internal Server Erroree! ");
    }
  };
  return (
    <>
    
      <span className="mx-auto text-2xl sm:text-4xl font-bold text-white ">
        * Music PlayGame *
      </span>
      
        <div
          className="w-20 sm:w-28 md:w-40 mt-3 cursor-pointer  border-2 border-purple-500 p-2 rounded-sm text-sm mx-auto text-white bg-violet-500"
          onClick={() => navigate('/music')}
          >
          
         Home
        </div>
      <div className="flex justify-center w-fit">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6 mt-6 border-4 border-violet-600 p-7 mx-auto"
        >
         
          <input
            className="w-60 md:w-80 h-8 p-2 rounded"
            type="email"
            placeholder="Email"
            name="email"
            value={inputFeild.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="w-60 md:w-80 h-8 p-2 rounded"
            type="password"
            placeholder="Password"
            name="password"
            value={inputFeild.password}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="text-white py-1 px-2 font-semibold rounded-xl shadow-md bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            type="submit"
          >
            Submit
          </button>

          <button
            className="text-white py-1 px-2 font-semibold rounded-xl shadow-md bg-blue-700"
            onClick={() => navigate("/signin")}
          >
            Signin
          </button>
        </form>
      </div>
    </>
  );
}
