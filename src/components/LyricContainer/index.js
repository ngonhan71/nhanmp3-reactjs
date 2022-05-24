import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap"
import helper from "../../helper/NhanMp3";
import songApi from "../../api/songApi";
import LyricActive from "../LyricActive";
import "./Lyric.css";
import { useDispatch, useSelector } from "react-redux";
import { addLyris } from "../../redux/actions/playerControl"
function LyricContainer({ cTime }) {
  const containerRef = useRef()
  const dispatch = useDispatch()
  
  const currentSong = useSelector((state) => state.playerControl.currentSong);
  const lyrics = useSelector((state) => state.playerControl.lyrics);

  const [loading, setLoading] = useState(false)
  const [dataLyric, setDataLyric] = useState([]);

  const [match, setMatch] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (lyrics.length > 0) return
      console.log('call api lyris')
      setLoading(true)
      const res = await songApi.getLyric(currentSong)
      setLoading(false)
      const data = res.dataFromZingMp3.data.sentences
      dispatch(addLyris(data))
    }
    fetchLyrics()
  }, [currentSong, dispatch, lyrics])

  useEffect(() => {
    if (lyrics && lyrics.length) {
      const customData = lyrics.map((item) => {
        return helper.wordsToSentence(item.words, cTime);
      });
      setDataLyric(customData) 
    }
     
  }, [cTime, lyrics])
  
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
      {loading ? <Spinner animation="border" variant="light" /> : (
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
      )}
    </div>
  );
}

export default LyricContainer;
