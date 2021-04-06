import {useState} from "react";
import axios from "axios";

export default function Signup() {
    const [user,setUser] = useState({username: "", password: ""});

    async function createAccount(e) {
        e.preventDefault();
        try {
            setUser({username: e.target.username.value, password: e.target.password.value});
            console.log(user);
            await axios.post('http://localhost:8000/signup', user);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <h3>Formulaire d'inscription : </h3>
            <form method="post" onSubmit={createAccount}>
                <label>Nom : </label>
                <input id="username" value={user.username}  type="text" onChange= {e=>setUser({...user, username: e.target.value})}/>

                <label>Mot de passe</label>
                <input id="password" value={user.password} type="password" onChange= {e=>setUser({...user, password: e.target.value})}/>

                <button type="submit">S'inscrire</button>
            </form>
        </>
    );
}

export {
    Signup
}
