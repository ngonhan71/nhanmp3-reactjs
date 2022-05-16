import { Link } from "react-router-dom"
import './SideBarOption.css'
function SideBarOption({Icon, title, path}) {

    return (
        <div className="sidebar-option">
            <Link to={path} className="sidebar-link">
                {Icon && <span className="icon"><Icon /></span>}
                {title && <span className="title">{title}</span>}
            </Link>
        </div>
    )

}

export default SideBarOption