import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Backend_URL=import.meta.env.VITE_BURL
export default function Signin() {
  const [inputFeild, setInputFeild] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
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
      if (
        !inputFeild.username ||
        !inputFeild.email ||
        !inputFeild.password ||
        !inputFeild.cpassword
      ) {
        return errorMsg("input feild is required! ");
      } else if (inputFeild.password !== inputFeild.cpassword) {
        return errorMsg("Password is not matching! ");
      }
      const { data } = await axios.post(
        `${Backend_URL}/user/signin`,        
        inputFeild
      );
      const { status, msg } = data;
      if (status === "error") {
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
        return errorMsg(msg);
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setInputFeild({
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
      return successMsg(msg);
    } catch (error) {
      return errorMsg("Internal Server Error! ");
    }
  };
  return (
    <>
      <span className="mx-auto text-2xl sm:text-4xl font-bold text-white ">
        * Music PlayGame *
      </span>
      <div className="flex justify-center w-fit">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6 mt-6 border-4 border-violet-600 p-7 mx-auto"
        >
          <input
            className="w-60 md:w-80 h-8 p-2 rounded"
            type="text"
            placeholder="UserName"
            name="username"
            value={inputFeild.username}
            onChange={(e) => handleChange(e)}
          />
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
          <input
            className="w-60 md:w-80 h-8 p-2 rounded"
            type="password"
            placeholder="Comferm Password"
            name="cpassword"
            value={inputFeild.cpassword}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="text-white py-1 px-2 font-semibold rounded-xl shadow-md bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
