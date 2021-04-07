import {useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';


export default function Signup() {
    const [user,setUser] = useState({username: "", password: ""});
    const history = useHistory();

    async function createAccount(e) {
        e.preventDefault();
        try {
            setUser({username: e.target.username.value, password: e.target.password.value});
            console.log(user);
            await axios.post('http://localhost:8000/signup', user);
            history.push('/signin')
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto",}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Formulaire d'inscription</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={createAccount}>
                        <div className="form-group">
                            <label>Nom</label>
                            <input id="username" value={user.username} className="form-control"  type="text" onChange= {e=>setUser({...user, username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input id="password" value={user.password} className="form-control" type="password" onChange= {e=>setUser({...user, password: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-success">S'inscrire</button>
                        <button type="button" className="btn btn-danger ml-4">Annuler</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export {
    Signup
}
