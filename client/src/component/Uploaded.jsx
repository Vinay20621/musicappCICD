import { useState, useRef } from "react";
import { useAudio } from "../contex";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useAuth } from "../authContex";
const Backend_URL=import.meta.env.VITE_BURL
const API=import.meta.env.VITE_API


function Uploaded() {
  const [uploadFile, setUploadFile] = useState(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { setMusicData, musicData } = useAudio();

  const fileInputRef = useRef(null);
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);

  const handleUpload = async () => {
    try {
      if (!uploadFile) {
        errorMsg("Please! Uploaded Music");
        return;
      }

      setDisable(true);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", "mymusic");

      const { data } = await axios.post(
        `${API}`,
        formData
      );

      const res = await axios.post(`${Backend_URL}/music/addmusic`, {
        name: fileInputRef.current.files[0].name,
        music: data.secure_url,
        id: user.id,
      });
      if (res.data.status === "error") return errorMsg("file is not uploaded1");
      setMusicData([...musicData, res.data.song]);
      fileInputRef.current.value = "";
      setUploadFile(null);
      return successMsg("success! Uploaded Music");
    } catch (error) {
      console.error("Upload failed", error);
      errorMsg("Upload failed. Please try again.");
    } finally {
      setDisable(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`text-white text-start ms-1 flex flex-col justify-center mt-3 ${!user && 'hidden' } `}>
        <input
          type="file"
          className="mb-3 ms-28 md:ms-20 sm:ms-40"
          ref={fileInputRef}
          onChange={(event) => setUploadFile(event.target.files[0])}
        />

        <button
          disabled={disable}
          onClick={handleUpload}
          className={`mt-2 mb-4 md:mt-0 ${
            disable ? "bg-red-500 cursor-not-allowed w-64" : "bg-violet-500"
          } text-white py-1 px-2 font-semibold rounded-xl shadow-md bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </>
  );
}

export default Uploaded;
