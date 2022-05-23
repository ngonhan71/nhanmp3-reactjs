import { useCallback, useEffect, useRef, useState } from "react";
import helper from "../../helper/NhanMp3";
import songApi from "../../api/songApi";
import LyricActive from "../LyricActive";
import "./Lyric.css";
import { useSelector } from "react-redux";
function LyricContainer({ cTime }) {
  const containerRef = useRef()
  const currentSong = useSelector((state) => state.playerControl.currentSong);
  const [dataLyric, setDataLyric] = useState([]);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      const res = await songApi.getLyric(currentSong)
      const data = res.dataFromZingMp3.data.sentences
      const customData = data.map((item) => {
        return helper.wordsToSentence(item.words, cTime);
      });
      setDataLyric(customData) 
    }
    fetchLyrics()
  }, [currentSong, cTime])
  
  const handleScroll = useCallback((height) => {
    containerRef.current.scrollTop += height
  }, [])

  useEffect(() => {
    containerRef.current.scrollTop = 0
  }, [currentSong])

  useEffect(() => {
    const result = dataLyric.find(item => item.active === true)
    if (result) setMatch(true)
    else setMatch(false)
  }, [dataLyric])

  return (
    <div className="lyric-container" ref={containerRef}>
      <ul className="lyrics">
        {dataLyric && match &&
          dataLyric.length > 0 &&
          dataLyric.map((item, index) => {
            return (
                item.active ? <LyricActive key={index} handleScroll={handleScroll} data={item} /> : 
                <li key={index} className="lyric">{item.data}</li>
            )
          })}
          {
            !match && dataLyric && 
            dataLyric.length > 0 &&
            dataLyric.map((item, index) => {
              return (
                helper.timLoiGanNhatActive(dataLyric, cTime) === index ? 
                <LyricActive key={index} handleScroll={handleScroll} data={item} /> : 
                  <li key={index} className="lyric">{item.data}</li>
              )
            })
          }
      </ul>
    </div>
  );
}

export default LyricContainer;
