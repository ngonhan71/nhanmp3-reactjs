import { useEffect, useRef, useState } from "react";
import {
  IoPlaySkipBack,
  IoShuffle,
  IoRepeatOutline,
  IoPlaySkipForward,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";
import homeApi from "../../api/homeApi";
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

  const [songInfo, setSongInfo] = useState({});
  const [streaming, setStreaming] = useState({});
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef();
  const progressRunRef = useRef();
  const progressCircleRef = useRef();
  const timeLeftRef = useRef();

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
  };

  const handleUpdateCurrentTimeUI = (currentTime) => {
    timeLeftRef.current.textContent = currentTime
      ? helper.formatTime(currentTime)
      : "00:00";
  };

  const handleUpdateProgressUI = (percent) => {
    progressRunRef.current.style.width = percent * 100 + "%";
    progressCircleRef.current.style.left = percent * 100 + "%";
  };

  const handlePlaySongByIndex = async (index) => {
    try {
      const songId = songs[index].encodeId
      const songObject = {
        currentSong: songId,
        currentIndex: index,
        isPaused: false,
        isPlaying: true,
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
        const streaming = await homeApi.getStreaming(currentSong);
        const song = await homeApi.getSong(currentSong);
        if (streaming.status !== 'error') {
          setStreaming(streaming.dataFromZingMp3.data);
          setSongInfo(song.dataFromZingMp3.data);
        } else {
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
        const data = await homeApi.getRecommend(songSearch);
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


  return (
    <div className={`player-controls ${isPlaying ? "active" : ""}`}>
      <div className="player-controls-contrainer">
        <div className="player-controls-left">
          <div className="music-info">
            <div className="media-left">
              <div className="thumbnail">
                <img src={songInfo && songInfo.thumbnail} alt="" />
              </div>
            </div>
            <div className="media-content">
              <p className="song-name">{songInfo && songInfo.title}</p>
              <p className="song-author">{songInfo && songInfo.artistsNames}</p>
            </div>
          </div>
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
              className="progress"
              ref={progressRef}
              onClick={handleClickProgress}
            >
              <div className="progress-bar">
                <div className="progress-run" ref={progressRunRef}></div>
              </div>
              <div className="progress-circle" ref={progressCircleRef}></div>
            </div>
            <span className="time right">
              {songInfo.duration ? helper.formatTime(songInfo.duration) : '00:00'}
            </span>
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
