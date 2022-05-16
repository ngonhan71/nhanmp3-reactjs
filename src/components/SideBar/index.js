import { Link } from 'react-router-dom';
import { IoHomeOutline, IoStarOutline, IoClose } from 'react-icons/io5'
import './SideBar.css'
import SideBarOption from '../SideBarOption'
function SideBar({isActive, onCloseSideBar}) {
    const handleCloseSideBar = () => {
        onCloseSideBar()
    }
    return (
        <div className={`sidebar ${isActive ? 'active' : ''}`}>
           <div className="logo sidebar-header">
                <Link to="/"  style={{fontSize: 24}}>Nhan Mp3</Link>
                <button className="nhanmp3-btn close-btn" onClick={handleCloseSideBar}><IoClose /></button>
                {/* <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" /> */}
           </div>
            
            <div className="nhanmp3-navbar">
                <div className="nav-item">
                    <SideBarOption Icon={IoHomeOutline} title="Khám Phá" path={"/"} />
                    <SideBarOption Icon={IoStarOutline} title="Top 100" path={"top100"} />
                </div>
            </div>


            <div className="hr"></div>
        </div>
    )

}

export default SideBar