import {useState} from "react";
import axios from "axios";
import {useCookies} from 'react-cookie';

export default function Signin() {
    const [user,setUser] = useState({name: "", password: ""});
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    async function connectAccount(e) {
        e.preventDefault();
        console.log(user);
        const response = (await axios.post('http://localhost:8000/token', user));
        const data = {username: user.username, token: response.data.token }
        console.log(data);
        setCookie('authToken', data, '/');
    }

    if (cookies && cookies.authToken) {
        return (
            <div className="container">
                <div className="row">
                    hello {cookies.authToken.username} !!
                </div>
                <div className="row">
                    <button className="btn btn-danger" onClick={() =>
                        removeCookie('authToken')}>
                        Déconnexion
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <h3>Connexion : </h3>
                <form method="post" onSubmit={connectAccount}>
                    <label>Nom d'utilisateur : </label>
                    <input id="username" type="text" onChange= {e=>setUser({...user, username: e.target.value})}/>

                    <label>Mot de passe</label>
                    <input id="password" type="password" onChange= {e=>setUser({...user, password: e.target.value})}/>

                    <button type="submit">Se connecter</button>
                </form>
            </>
        );
    }
}

export {
    Signin
}
