import { useEffect, useState, memo } from "react";
import homeApi from "../../api/homeApi";

import { useParams } from "react-router-dom";
import PlayListDetail from "../../components/PlayListDetail";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../redux/actions/playlists"

function AlbumPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [dataAlbum, setDataAlbum] = useState({})

  const { id } = params;
  const playlists = useSelector((state) => state.playlists.playlists);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isFetch = playlists.find((playlist) => playlist.encodeId === id) 
        if (isFetch) {
          setDataAlbum(isFetch);
          return
        }
        console.log('call API getplayist', id)
        const data = await homeApi.getPlaylist(id);
        dispatch(addPlaylist(data.dataFromZingMp3.data))
        setDataAlbum(data.dataFromZingMp3.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, dispatch, playlists]);

  return (
    <div className="mt-100 page">
      {<PlayListDetail data={dataAlbum} />}
    </div>
  );
}

export default memo(AlbumPage);
