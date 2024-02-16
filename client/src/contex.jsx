import { createContext, useContext, useEffect, useState } from "react";
const audioContex = createContext(null);

function AudioProvider({ children }) {
  const [musicData, setMusicData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  return (
    <>
      <audioContex.Provider
        value={{
          musicData,
          setMusicData,
          currentTrack,
          autoPlay,
          setAutoPlay,
          setCurrentTrack,
        }}
      >
        {children}
      </audioContex.Provider>
    </>
  );
}

export default AudioProvider;
export const useAudio = () => useContext(audioContex);
