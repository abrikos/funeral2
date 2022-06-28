import {Link} from "react-router-dom";

export default function MarketList() {
    return <ul>
        <h1>Список организаций</h1>
        <li><Link to={`/market/company/12`}>Перспективные захоронения</Link></li>
    </ul>
}