import './App.sass';
import Menu from "components/Menu/Menu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "pages/home/Home";
import Market from "pages/market/Market";
import Login from "./pages/login/Login";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "./api";
import {login} from "./store/user";
import Search from "./pages/search/Search";
import Chat from "./pages/chat/Chat";

function App() {
    const logged = useSelector((state) => state.user && state.user.logged)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = api.getToken()
        if (token) dispatch(login())
    }, [logged])

    return (
        <BrowserRouter>
            <div className="App">
                <Menu/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/chat" element={<Chat/>}/>
                        {!logged && <Route path="/*" element={<Login/>}/>}
                        {logged && <Route path="/market/*" element={<Market/>}/>}
                    </Routes>

                    <center style={{color: '#B9B9B9'}}>
                        © 1992 - 2020 Честный Агент © Все права защищены.
                        <br/>
                        8 (495) 150-21-12
                    </center>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
