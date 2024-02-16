import axios from "axios";
import musicImg from "../assets/music.jpg";
import { useAudio } from "../contex";
import { toast } from "react-toastify";
import { useAuth } from "../authContex";
import "react-toastify/dist/ReactToastify.css";
const Backend_URL=import.meta.env.VITE_BURL

function PlayList() {
  const {
    musicData,
    setMusicData,
    currentTrack,
    setCurrentTrack,
    setAutoPlay,
  } = useAudio();
  const { user } = useAuth();
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Backend_URL}/music/delete/${id}`
      );
      if (data.status == "error") return errorMsg("Song not Deleted!");
      const newSong = musicData.filter((i) => i._id !== id);
      setCurrentTrack(0);
      setAutoPlay(false);

      setMusicData(newSong);
      successMsg("Song deleted Successfully! ");
      return;
    } catch (error) {
      return errorMsg("Song not Deleted!");
    }
  };

  return (
    <>
      <div className="mt-3 ms-3">
        {musicData.map((i, index) => (
          <div
            key={i._id}
            className="flex items-center mt-3 "
            onClick={() => {
              setCurrentTrack(index), setAutoPlay(true);
            }}
          >
            <div className="shrink-0 border-red-300">
              <img
                className={`${
                  currentTrack === index && "rotated"
                } h-16 w-16 object-cover rounded-full `}
                src={musicImg}
                alt="Current music photo"
              />
            </div>
            <div className="text-white text-start ms-3 cursor-pointer flex">
              <div>{i.name} </div>
              <div
                onClick={() => handleDelete(i._id, index)}
                style={{ display: user?.role !== "admin" ? "none" : "block" }}
              >
                <i className="bi bi-trash text-red-500 text-2xl ms-1"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlayList;
