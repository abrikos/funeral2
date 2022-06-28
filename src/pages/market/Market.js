import "./market.sass"
import org from "icons/org.svg"
import {Link, Route, Routes} from "react-router-dom";
import MarketList from "./MarketList";
import MarketCompany from "./MarketCompany";

export default function Market(){
    return <div className="market">
        <div className="marketLeft">
            <div className="name">Честный агент</div>
            <div className="role">менеджер процесса</div>
            <div className="section">
                <img src={org} alt={''}/>
                <Link to="/market">Организации</Link>
            </div>

        </div>
        <div className="market-content">
            <Routes>
                <Route path="" element={<MarketList/>} />
                <Route path="company/:id" element={<MarketCompany/>} />
            </Routes>
        </div>
    </div>
}