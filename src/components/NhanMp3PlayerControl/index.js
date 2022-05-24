import { useEffect, useRef, useState } from "react";
import {
  IoPlaySkipBack,
  IoShuffle,
  IoRepeatOutline,
  IoPlaySkipForward,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoMicSharp,
  IoVolumeHighSharp,
  IoVolumeMute
} from "react-icons/io5";
import { Spinner } from "react-bootstrap"
import LyricContainer from "../LyricContainer"
import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";
import songApi from "../../api/songApi";
import "./NhanMp3PlayerControl.css";
import helper from "../../helper/NhanMp3";
import {
  updateCurrentSong,
  updateIsPaused,
  addSongs,
  updateIsPlaying
} from "../../redux/actions/playerControl";

function NhanMp3PlayerControl() {
  const dispatch = useDispatch();
  // console.log("player re");


  const currentSong = useSelector((state) => state.playerControl.currentSong);
  const isPlaying = useSelector((state) => state.playerControl.isPlaying);
  const currentIndex = useSelector((state) => state.playerControl.currentIndex);
  const songs = useSelector((state) => state.playerControl.songs);
 
  const songSearch = useSelector((state) => state.playerControl.songSearch);
  const isPaused = useSelector((state) => state.playerControl.isPaused);
  const pausingToPlayNewSong = useSelector((state) => state.playerControl.pausingToPlayNewSong);

  const [loading, setLoading] = useState(false)

  const [songInfo, setSongInfo] = useState({});
  const [streaming, setStreaming] = useState({});
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [readyToDrag, setReadyToDrag] = useState(false)

  const [showLyric, setShowLyric] = useState(false)

  const [cTime, setCTime] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(1)


  const audioRef = useRef(null);
  const progressRef = useRef();
  const progressRunRef = useRef();
  const progressCircleRef = useRef();
  const timeLeftRef = useRef();
  const volumeRef = useRef()
  const volumeBarRef = useRef()
  const volumeCircleRef = useRef()

  const handleClickBtnPlay = () => {
    if (!isPaused) {
      dispatch(updateIsPaused(true));
    } else {
      dispatch(updateIsPaused(false));
    }
  };


  const handleClickBtnPre = () => {
    handlePlaySongByIndex(currentIndex - 1);
  }

  const handleNextSongOrOnEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else if (!isRepeat) {
      if (isRandom) {
        const indexRandom = helper.randomIndex(songs.length, currentIndex);
        handlePlaySongByIndex(indexRandom);
        return;
      }
      if (!(currentIndex === songs.length - 1)) {
        handlePlaySongByIndex(currentIndex + 1);
        return;
      }
    }
    return;
  }

  const handleClickBtnNext = () => {
    handleNextSongOrOnEnded()
  };

  const handleClickBtnRepeat = () => {
    const value = !isRepeat;
    setIsRepeat(value);
    if (value) {
      setIsRandom(false);
    }
  };

  const handleClickBtnRandom = () => {
    const value = !isRandom;
    setIsRandom(value);
    if (value) {
      setIsRepeat(false);
    }
  };

  const handleOnTimeUpdateAudio = () => {
    const duration = audioRef.current.duration;
    const percent = audioRef.current.currentTime / duration;
    handleUpdateProgressUI(percent);
    const currentTime = percent * duration;
    handleUpdateCurrentTimeUI(currentTime);
    setCTime(currentTime)
  };

  const handleOnEndedAudio = () => {
    handleNextSongOrOnEnded()
  };

  const handleClickProgress = (e) => {
    const clientX = e.clientX;
    const progressClientRect = progressRef.current.getBoundingClientRect();
    const percent =
      (clientX - progressClientRect.left) / progressClientRect.width;
    handleUpdateProgressUI(percent);

    const duration = audioRef.current.duration;
    const currentTime = percent * duration;
    audioRef.current.currentTime = currentTime;

    handleUpdateCurrentTimeUI(currentTime);
    setCTime(currentTime)

  };

  const handleClickVolume = (e) => {
    const clientX = e.clientX;
    const volumeClientRect = volumeRef.current.getBoundingClientRect();
    const percent =
      (clientX - volumeClientRect.left) / volumeClientRect.width;
    handleUpdateVolumeUI(percent)
    const volume = percent * 1
    audioRef.current.volume = volume > 0 ? volume : 0;
    setCurrentVolume(volume)

  }

  const handleProgressOnMouseDown = (e) => {
    setReadyToDrag(true)
  }  

  const handleUpdateCurrentTimeUI = (currentTime) => {
    timeLeftRef.current.textContent = currentTime
      ? helper.formatTime(currentTime)
      : "00:00";
  };

  const handleUpdateProgressUI = (percent) => {
    progressRunRef.current.style.width = percent * 100 + "%";
    progressCircleRef.current.style.left = percent * 100 + "%";
  };

  const handleUpdateVolumeUI = (percent) => {
    volumeBarRef.current.style.width = percent * 100 + "%";
    volumeCircleRef.current.style.left = percent * 100 + "%";
  }

  const handlePlaySongByIndex = async (index) => {
    try {
      const songId = songs[index].encodeId
      const songName = songs[index].title
      document.title = songName
      const songObject = {
        currentSong: songId,
        currentIndex: index,
        isPaused: false,
        isPlaying: true,
        lyrics: []
      };
      const action = updateCurrentSong(songObject);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const streaming = await songApi.getStreaming(currentSong);
        const song = await songApi.getSong(currentSong);
        setLoading(false)
        if (streaming.status !== 'error') {
          setStreaming(streaming.dataFromZingMp3.data);
          setSongInfo(song.dataFromZingMp3.data);
        } else {
          const songObject = {
            currentSong: "",
            currentIndex: -1,
            isPlaying: false,
            isPaused: true
          };
          const action = updateCurrentSong(songObject);
          dispatch(action);
          dispatch(updateIsPlaying(false))
          alert (streaming.message)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentSong, dispatch]);

  useEffect(() => {
    const getRecommendSong = async () => {
      try {
        const data = await songApi.getRecommend(songSearch);
        dispatch(addSongs(data.dataFromZingMp3.data.items.filter(item => item.streamingStatus === 1)))
      } catch (error) {
        console.log(error);
      }
    };
    if (songSearch) {
      getRecommendSong();
    }
  }, [songSearch, dispatch]);


  useEffect(() => {
    if (pausingToPlayNewSong) {
      audioRef.current.src = streaming && streaming[128]
    }
    if (!isPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [streaming, isPaused, pausingToPlayNewSong]);

  const handleShowLyric = async () => {
    setShowLyric(!showLyric)
  }

  useEffect(() => {
    const handleDocumentOnMouseMove = (e) => {
      const clientX = e.clientX
      const progressRect = progressRef.current.getBoundingClientRect()
      const left = progressRect.left
      
      const min = left
      const max = progressRect.width + left
      if (readyToDrag && clientX >= min && clientX <= max) {
          if (!isPaused) {
            audioRef.current.pause()
          }
          const percent = (clientX - left) / progressRect.width
          const duration = audioRef.current.duration
          audioRef.current.currentTime = percent * duration
          handleUpdateProgressUI(percent)
      }
    }
    const handleDocumentOnMouseUp = (e) => {
      if (audioRef.current.paused && readyToDrag) {
        audioRef.current.play()
      }
      setReadyToDrag(false)
    }
    document.addEventListener('mousemove', handleDocumentOnMouseMove)
    document.addEventListener('mouseup', handleDocumentOnMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleDocumentOnMouseMove)
      document.removeEventListener('mouseup', handleDocumentOnMouseUp)
    }
  }, [readyToDrag, dispatch, isPaused])

  const handleClickVolumeBtn = () => {
    if (currentVolume !== 0) {
      audioRef.current.volume = 0
      handleUpdateVolumeUI(0)
      setCurrentVolume(0)
    }
    else {
      audioRef.current.volume = 0.5
      handleUpdateVolumeUI(0.5)
      setCurrentVolume(0.5)
    }
  }

  return (
    <div className={`player-controls ${isPlaying ? "active" : ""}`}>
      <div className="player-controls-container">
        {showLyric && <LyricContainer cTime={cTime} />}
        <div className="player-controls-left">
          {loading ? <Spinner animation="border" variant="light" /> : (
            <div className="music-info">
              <div className="media-left">
                <div className="thumbnail">
                  <img src={songInfo && songInfo.thumbnail} alt="" />
                </div>
              </div>
              <div className="media-content">
                <p className="song-name title">{songInfo && songInfo.title}</p>
                <p className="song-author">{songInfo && songInfo.artistsNames}</p>
              </div>
            </div>
          )}
        </div>
        <div className="player-controls-center">
          <div className="actions">
            <button
              className={`nhanmp3-btn btn-shuffle ${isRandom ? "active" : ""}`}
              onClick={handleClickBtnRandom}
            >
              <IoShuffle />
            </button>
            <button
              className="nhanmp3-btn btn-pre"
              onClick={handleClickBtnPre}
              disabled={currentIndex === 0 ? true : false}
            >
              <IoPlaySkipBack />
            </button>
            <button
              className="nhanmp3-btn btn-play"
              onClick={handleClickBtnPlay}
            >
              {isPaused ? <IoPlayCircleOutline /> : <IoPauseCircleOutline />}
            </button>
            <button
              className="nhanmp3-btn btn-next"
              onClick={handleClickBtnNext}
              disabled={currentIndex === songs.length - 1 ? true : false}
            >
              <IoPlaySkipForward />
            </button>
            <button
              className={`nhanmp3-btn btn-repeat ${isRepeat ? "active" : ""}`}
              onClick={handleClickBtnRepeat}
            >
              <IoRepeatOutline />
            </button>
          </div>
          <div className="duration-container">
            <span className="time left" ref={timeLeftRef}>
              00:00
            </span>
            <div
              className="nhanmp3-progress"
              ref={progressRef}
              onClick={handleClickProgress}
              onMouseDown={handleProgressOnMouseDown}
            >
              <div className="nhanmp3-progress-bar">
                <div className="progress-run" ref={progressRunRef}></div>
              </div>
              <div className="progress-circle" ref={progressCircleRef}></div>
            </div>
            <span className="time right">
              {songInfo.duration ? helper.formatTime(songInfo.duration) : '00:00'}
            </span>
          </div>
        </div>
          
        <div className="player-controls-right">
          <button className={`nhanmp3-btn`} onClick={handleShowLyric}><IoMicSharp /></button>
          
          <div className="volume-container">
            <button className="nhanmp3-btn" onClick={handleClickVolumeBtn}>
              {currentVolume && currentVolume > 0 ? <IoVolumeHighSharp /> : <IoVolumeMute />} 
            </button>
            <div className="volume-progress" ref={volumeRef} onClick={handleClickVolume}>
              <div className="volume-progress-bar" ref={volumeBarRef}></div>
              <div className="volume-progress-circle" ref={volumeCircleRef}></div>
            </div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={streaming && streaming[128]}
          onTimeUpdate={handleOnTimeUpdateAudio}
          onEnded={handleOnEndedAudio}
        ></audio>
      </div>
    </div>
  );
}

export default memo(NhanMp3PlayerControl);
