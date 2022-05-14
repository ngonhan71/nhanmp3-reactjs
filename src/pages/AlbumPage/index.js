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
