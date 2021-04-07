import React, {useState} from "react";
import axios from "axios";
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';


export default function Signin() {
    const [user,setUser] = useState({name: "", per_password: ""});
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const history = useHistory();

    async function connectAccount(e) {
        e.preventDefault();
        const response = (await axios.post('http://localhost:8000/token', user));
        const data = {per_username: user.per_username, token: response.data.token }
        setCookie('authToken', data, '/');
        //localStorage.setItem("token", cookies.authToken);
        //document.location.reload();
        history.push("/");
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto",}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Connexion</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={connectAccount}>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input id="per_username" className="form-control" type="text" onChange= {e=>setUser({...user, per_username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input id="per_password" className="form-control" type="password" onChange= {e=>setUser({...user, per_password: e.target.value})}/>
                        </div>
                        <div className="form-group">
                        <a onClick={() => {history.push('/signup')}} className="text-decoration-none">Pas encore de compte ? Créez-en un dès maintenant !</a>
                        </div>
                        <button type="submit" className="btn btn-success">Connexion</button>
                        <button type="button" className="btn btn-danger ml-4" onClick={() => {history.push('/');}}>Annuler</button>
                    </form>
                </div>
            </div>
        </>
    );

}

export {
    Signin
}
