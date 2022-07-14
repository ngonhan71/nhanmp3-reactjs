import { NavLink } from "react-router-dom"
import './SideBarOption.css'
function SideBarOption({Icon, title, path, onCloseSideBar}) {

    return (
        <div className="sidebar-option" onClick={onCloseSideBar}>
            <NavLink to={path} className="sidebar-link">
                {Icon && <span className="icon"><Icon /></span>}
                {title && <span className="title">{title}</span>}
            </NavLink>
        </div>
    )

}

export default SideBarOption