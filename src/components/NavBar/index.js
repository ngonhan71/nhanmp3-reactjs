import { Link } from 'react-router-dom';
import { memo} from 'react'

import './NavBar.css';
function NavBar() {


    return (
        <div className="navbar">
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" ><h1>Nhan Mp3</h1></Link>
                </li>
                <li className="nav-item">
                    <Link to="/top100">Top 100</Link>
                </li>
            </ul>
        </div>
    )

}

export default memo(NavBar)