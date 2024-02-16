import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../component/MusicPlayer";
import Uploaded from "../component/Uploaded";
import { useAudio } from "../contex";
import axios from "axios";
import UserList from "../component/UserList";
import { useAuth } from "../authContex";
const Backend_URL=import.meta.env.VITE_BURL
function Home() {
  const { musicData, setMusicData, setAutoPlay } = useAudio();
  const { user } = useAuth();
  const [userList, setUserList] = useState(false);
  const navigate = useNavigate();
  const getMusicList = async () => {
    try {
      const { data } = await axios.get(`${Backend_URL}/music/allmusic`);
      if (data.status === "error") {
        return navigate("/");
      }
      setMusicData(data.songs);
    } catch (error) {
      return navigate("/");
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    getMusicList();
    setAutoPlay(false);
  }, []);
  return (
    <>
      <span className="mx-auto text-2xl sm:text-4xl font-bold text-white ">
        * Music PlayGame *
      </span>
      <div className="flex ">
        <div
          className="w-20 sm:w-28 md:w-40 mt-3 cursor-pointer  border-2 border-purple-500 p-2 rounded-sm text-sm mx-auto text-white bg-violet-500"
          onClick={() => setUserList(false)}
        >
          MusicList
        </div>
        {user && user.role === "admin" && (
          <div
            className=" w-20 sm:w-28 md:w-40 mt-3 cursor-pointer  border-2 border-purple-500 p-2 rounded-sm text-sm mx-auto text-white bg-violet-500"
            onClick={() => setUserList(true)}
          >
            UserList
          </div>
        )}

        <div
          className={` ${!user && 'hidden'} sm-20 sm:w-28 md:w-40 mt-3 cursor-pointer  border-2 border-purple-500 p-2 rounded-sm text-sm mx-auto text-white bg-violet-500`}
          onClick={logOut}
        >
          LogOut
        </div>
        <div
          className={` ${user && 'hidden'} sm-20 sm:w-28 md:w-40 mt-3 cursor-pointer  border-2 border-purple-500 p-2 rounded-sm text-sm mx-auto text-white bg-violet-500`}
          onClick={()=>navigate('/')}
        >
          Login
        </div>
      </div>
      <div className="bg-gray-700 main  mx-auto pb-3 pt-12 mt-4 container">
        {userList ? (
          <UserList />
        ) : musicData.length == 0 ? (
          <Uploaded />
        ) : (
          <MusicPlayer />
        )}
      </div>
    </>
  );
}

export default Home;
