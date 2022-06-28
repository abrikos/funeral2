import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useState} from "react";
import api from "api"
import {useDispatch} from "react-redux";
import {login} from "../../store/user";

export default function Login() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function submit(e){
        e.preventDefault()
        const token = await api.login(username).catch(e=>setError(e.response.data.error));
        if(token){
            dispatch(login(token))
        }
    }

    return <form>
        <center>
        <h1>Для входа в этот раздел необходима авторизация</h1>
        <Input label="Имя" onChange={setUsername}/>
        <Input label="Пароль" onChange={setPassword}/>
        <Button label="Вход" onClick={submit}/>
            {error && <div style={{color:'red'}}>{error}</div>}
        </center>
    </form>
}