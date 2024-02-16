import axios from "axios";
import userImg from "../assets/user.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
const Backend_URL=import.meta.env.VITE_BURL
function UserList() {
  const [userData, setUserData] = useState([]);
  const [feild, setFeild] = useState(null);
  const [feildValue, setFeildValue] = useState(null);
  const [currentUser, setCurrentUser] = useState(0);

  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Backend_URL}/user/delete/${id}`
      );
      if (data.status == "error") return errorMsg("Song not Deleted!");
      console.log(data);
      const newUser = userData.filter((i) => i._id !== id);
      setCurrentUser(0);

      setUserData(newUser);
      successMsg("User deleted Successfully! ");
      return;
    } catch (error) {
      return errorMsg("User not Deleted!");
    }
  };
  const getUserList = async () => {
    try {
      const { data } = await axios.get(`${Backend_URL}/user/alluser`);
      if (data.status === "error") {
        return navigate("/");
      }
      setUserData(data.user);
    } catch (error) {
      return navigate("/");
    }
  };
  const handleEdit = (f, v) => {
    setFeild(f);
    setFeildValue(v);
  };
  const handleEditData = async () => {
    try {
      const { data } = await axios.patch(
        `${Backend_URL}/user/${userData[currentUser]._id}/${feild}`,
        {
          [feild]: feildValue,
        }
      );
      if (data.status === "error") {
        return errorMsg("user not edit!");
      }

      const newData = userData.map((i) => {
        if (i._id === userData[currentUser]._id) {
          return { ...i, [feild]: feildValue };
        }
        return i;
      });

      setUserData(newData);
      successMsg("Edited Successfully !");
      setFeild(null)
      setFeildValue(null)
    } catch (error) {}
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <div className="container flex flex-col md:flex-row md:justify-between justify-center ">
        <div className="order-last md:order-first flex justify-center">
          <div className="mt-1 ms-3 ">
            {userData.map((i, index) => (
              <div
                key={i._id}
                className="flex items-center mt-3 "
                onClick={() => {
                  setCurrentUser(index);
                }}
              >
                <div className="shrink-0 border-red-300">
                  <img
                    className={`${
                      currentUser === index && "rotated"
                    } h-16 w-16 object-cover rounded-full `}
                    src={userImg}
                    alt="Current music photo"
                  />
                </div>
                <div className="text-white text-start ms-3 cursor-pointer flex">
                  <div>{i.username} </div>
                  <div onClick={() => handleDelete(i._id)} className="ms-2">
                  <i className="bi bi-trash text-red-500 text-2xl ms-1"></i>                
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 ">
          {feild && (
            <>
              <input
                type="text"
                className="ps-2 h-8"
                value={feildValue}
                onChange={(e) => setFeildValue(e.target.value)}
              />
              <button
                className="p-1 ms-1 text-white bg-green-500 w-20"
                onClick={handleEditData}
              >
                Edit
              </button>
            </>
          )}
          <div className="shrink-0 border-red-300  flex justify-center me-14 w-full">
            <img
              className="xl:h-80 xl:w-80  md:h-64 md:w-64 object-cover rounded-full mx-auto "
              src={userImg}
              alt="Current music photo"
            />
          </div>

          <div className="mt-3 mb-3 me-4 ">
            {userData.length !== 0 && (
              <>
                <div className="text-white text-xl  sm:text-2xl">
                  {" "}
                  <span className="text-violet-500 text-2xl  sm:text-3xl">
                    Username:
                  </span>{" "}
                  {userData[currentUser].username}
                  <button
                    className="ms-2"
                    onClick={() =>
                      handleEdit("username", userData[currentUser].username)
                    }
                  >
                   <i className="bi bi-pen-fill text-green-600 text-2xl ms-1"></i>
                  </button>
                </div>
                <div className="text-white text-xl  sm:text-2xl">
                  {" "}
                  <span className="text-violet-500 text-2xl  sm:text-3xl ">
                    Email:
                  </span>{" "}
                  {userData[currentUser].email}
                  <button
                    className="ms-2"
                    onClick={() =>
                      handleEdit("email", userData[currentUser].email)
                    }
                  >
                   <i className="bi bi-pen-fill text-green-600 text-2xl ms-1"></i>
                  </button>
                </div>
                <div className="text-white text-xl  sm:text-2xl">
                  {" "}
                  <span className="text-violet-500 text-2xl  sm:text-3xl ">
                    Role:
                  </span>{" "}
                  {userData[currentUser].role}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
