import { Link } from 'react-router-dom'
import './NhanMp3Card.css'
import { addSongs, updateCurrentAlbum } from '../../redux/actions/playerControl'
import homeApi from '../../api/homeApi'
import { useDispatch, useSelector } from 'react-redux'
function NhanMp3Card({data}) {

    const handleShowSubtitle = data.artists.map((artist, index) => {
        return index <= 2 
        ? (index < 2 ? <span key={artist.id}>{artist.name}, </span> : <span key={artist.id}>{artist.name}</span>) 
        : ''
    })

    // Lay ra bai hat hien tai
    const currentSong = useSelector((state) => state.playerControl.currentSong);
    

    const dispatch = useDispatch()
    const handleClick = async (e) => {
        // Neu khong co bai hat, thi get Playlist
        // Nguoc lai, khong lam gi
        if (!currentSong) {
            const id = e.currentTarget.getAttribute("data-id");
            const data = await homeApi.getPlaylist(id)
            dispatch(updateCurrentAlbum())
            dispatch(addSongs(data.dataFromZingMp3.data.song.items))
        }
    }
    
    return (
        <div className="nhanmp3-card" onClick={handleClick} data-id={data.encodeId}>

            <Link to={`/album/${data.encodeId}`}>
                <div className="nhanmp3-card-image">
                    <img src={data.thumbnail} alt="dsds" />
                </div>
            </Link>
            <div className="nhanmp3-card-content">
                <h4 className="title">
                    <Link  to={`/album/${data.encodeId}`}>{data.title}</Link>
                </h4>

                <h3 className="subtitle">
                    {handleShowSubtitle}
                </h3>
            </div>

        </div>
    )

}

export default NhanMp3Card