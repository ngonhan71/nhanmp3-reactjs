import { useEffect, useState, memo } from "react";
import homeApi from "../../api/homeApi";

import { useParams } from "react-router-dom";
import PlayListDetail from "../../components/PlayListDetail";
import { useDispatch, useSelector } from "react-redux";

function AlbumPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [dataAlbum, setDataAlbum] = useState();

  const { id } = params;
  const currentSong = useSelector((state) => state.playerControl.currentSong);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getPlaylist(id);
        // // Neu chua co bai hat, thi dispatch songs vao store
        // if (!currentSong) {
        //   dispatch(
        //     addSongs(data.dataFromZingMp3.data.song.items.filter((item) => item.streamingStatus === 1))
        //   );
        //   // dispatch(updateIndexSong(0))
        // }
        setDataAlbum(data.dataFromZingMp3.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, currentSong, dispatch]);

  return (
    <div className="mt-100 page">
      {dataAlbum && <PlayListDetail data={dataAlbum} />}
    </div>
  );
}

export default memo(AlbumPage);
