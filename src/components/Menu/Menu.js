import home from "icons/home.svg";
import market from "icons/market.svg";
import search from "icons/search.svg";
import settings from "icons/settings.svg";
import chat from "icons/chat.svg";
import exit from "icons/exit.svg";
import './menu.sass'
import {Link, useLocation} from "react-router-dom";
import {logout} from "store/user";
import {useDispatch, useSelector} from "react-redux";

export default function Menu() {
    const location = useLocation()
    const dispatch = useDispatch()
    const logged = useSelector((state) => state.user && state.user.logged)

    function isSelected(path) {
        return path === '/' && location.pathname === '/' ? 'selected' : path !== '/' && location.pathname.includes(path) ? 'selected' : ''
    }

    return <div className="menu">
        <div className="menuTop">
            <Link to="/" className={isSelected('/')}>
                <img src={home} alt="home"/>
            </Link>
            <Link to="/market" className={isSelected('/market')}>
                <img src={market} alt="market"/>
            </Link>
            <Link to="/search" className={isSelected('/search')}>
                <img src={search} alt="search"/>
            </Link>

        </div>
        <div className="menuBottom">
            <Link to="/settings" className={isSelected('/settings')}>
                <img src={settings} alt="settings"/>
            </Link>
            <Link to="/chat" className={isSelected('/chat')}>
                <img src={chat} alt="chat"/>
            </Link>
            {logged && <button onClick={()=>dispatch(logout())}>
                <img src={exit} alt="exit"/>
            </button>}

        </div>
    </div>
}