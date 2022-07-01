import { useDispatch, useSelector } from "react-redux";
import "./Song.css";
import helper from "../../helper/NhanMp3";
import { updateCurrentSong, addSongs, updateCurrentAlbum } from "../../redux/actions/playerControl";
import { memo } from "react";
import { useParams } from "react-router-dom";
import homeApi from "../../api/homeApi";
// import { useLocation } from "react-router-dom";

function Song({ data, index, isPlay, isSearching }) {
  const dispatch = useDispatch();
  const isPaused = useSelector((state) => state.playerControl.isPaused);
  const currentSong = useSelector((state) => state.playerControl.currentSong);
  const currentAlbum = useSelector((state) => state.playerControl.currentAlbum);
  const params = useParams();

  const { id } = params;

  const handleSongClick = async (e) => {
    const songItem = e.currentTarget;
    const songId = songItem.getAttribute("song-id");
    const songName = songItem.getAttribute("song-name")
    document.title = songName
    const songObject = {
      currentSong: songId,
      currentIndex: isSearching ? -1 : index,
      isPaused: true,
      isPlaying: true,
      songSearch: isSearching ? songId : "",
      lyrics: []
    };

    const action = updateCurrentSong(songObject);
    dispatch(action);

    dispatch(updateCurrentAlbum(id))
    if (id) {
      const isFetch = currentAlbum === id
      if (isFetch) return
      const data = await homeApi.getPlaylist(id);
      // console.log('get danh sach song tu playlist')
      dispatch(addSongs(data.dataFromZingMp3.data.song.items.filter(item => 
        item.streamingStatus === 1 && item.isWorldWide )));
    }
  };

  
  return (
    <div
      className={`song-item ${data.encodeId === currentSong ? 'active' : ''}`}
      onClick={handleSongClick}
      song-id={data.encodeId}
      song-name={data.title}
    >
      <div className="media">
        <div className="media-left">
          <div className={`song-thumbnail ${isPlay && !isPaused ? "play" : ""}`}>
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
