import { NavLink } from "react-router-dom"
import './SideBarOption.css'
function SideBarOption({Icon, title, path}) {

    return (
        <div className="sidebar-option">
            <NavLink to={path} className="sidebar-link">
                {Icon && <span className="icon"><Icon /></span>}
                {title && <span className="title">{title}</span>}
            </NavLink>
        </div>
    )

}

export default SideBarOption