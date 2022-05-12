import { useDispatch, useSelector } from "react-redux";
import "./Song.css";
import helper from "../../helper/NhanMp3";
import { updateCurrentSong, addSongs } from "../../redux/actions/playerControl";
import { memo } from "react";
import { useParams } from "react-router-dom";
import homeApi from "../../api/homeApi";
// import { useLocation } from "react-router-dom";

function Song({ data, index, isPlay, isSearching }) {
  const dispatch = useDispatch();
  const isPaused = useSelector((state) => state.playerControl.isPaused);
  const currentSong = useSelector((state) => state.playerControl.currentSong);
  const params = useParams();

  const { id } = params;

  const handleSongClick = async (e) => {
    const songItem = e.currentTarget;
    const songId = songItem.getAttribute("song-id");
    const songObject = {
      currentSong: songId,
      currentIndex: isSearching ? -1 : index,
      isPaused: false,
      isPlaying: true,
      songSearch: isSearching ? songId : "",
      pausingToPlayNewSong: currentSong && isPaused,
    };

    const action = updateCurrentSong(songObject);
    dispatch(action);


    // Khi currentSong thay doi => cap nhat lai song-list trong store
    if (id) {
      const data = await homeApi.getPlaylist(id);
      dispatch(addSongs(data.dataFromZingMp3.data.song.items.filter(item => item.streamingStatus === 1)));
    }
  };

  return (
    <div
      className="song-item"
      onClick={handleSongClick}
      song-id={data.encodeId}
    >
      <div className="media">
        <div className="media-left">
          <div className={`song-thumbnail ${isPlay ? "play" : ""}`}>
            <img src={data.thumbnail} alt="" />
            <div className="action-play">
              <div className="icon-playing"></div>
            </div>
          </div>
          <div className="song-info">
            <p className="song-name title">{data.title}</p>
            <p className="song-author subtitle">{data.artistsNames}</p>
          </div>
        </div>
        <div className="media-content">
          <div className="album-info">
            <span>{data.album?.title}</span>
          </div>
        </div>

        <div className="media-right">
          <div className="song-duration">
            <span>{helper.formatTime(data.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Song);