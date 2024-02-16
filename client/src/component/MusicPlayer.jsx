import React, { useEffect } from "react";
import { useAudio } from "../contex";
import PlayList from "./PlayList";
import musicImg from "../assets/music.jpg";
import Uploaded from "./Uploaded";


function MusicPlayer() {
  const { musicData, currentTrack, setAutoPlay, autoPlay, setCurrentTrack } =
    useAudio();

  const handleTrackEnded = () => {
    // Play the next track
    setCurrentTrack((prevTrack) => (prevTrack + 1) % musicData.length);
    setAutoPlay(true);
  };
  useEffect(() => {
    setAutoPlay(false);
  }, []);

  return (
    <div className="container flex flex-col md:flex-row md:justify-between justify-center ">
      <div className="order-last md:order-first">
        <Uploaded></Uploaded>
        <PlayList></PlayList>
      </div>

      <div className="mt-3 ">
        <div className="shrink-0 border-red-300  flex justify-center me-14 w-full">
          <img
            className="xl:h-80 xl:w-80  md:h-64 md:w-64 object-cover rounded-full mx-auto rotated"
            src={musicImg}
            alt="Current music photo"
          />
        </div>

        <div className="flex  mt-3 mb-3 me-4 justify-center">
          <audio
            controls
            autoPlay={autoPlay}
            onEnded={handleTrackEnded}
            src={musicData[currentTrack].url}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
