import React, {useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';


export default function New() {
    const [newQuizz,setNewQuizz] = useState({qui_name: "", qui_image: null, person_id: null});
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const history = useHistory();

    async function createNewQuizz(e) {
        e.preventDefault();
        try {
            setNewQuizz({qui_name: e.target.qui_name.value, qui_image: e.target.qui_image.value, person_id: cookies.authToken});
            await axios.post('http://localhost:8000/quizz/new', newQuizz);
            history.push('/quizz')
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto",}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Ajouter un quizz</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={createNewQuizz}>
                        <div className="form-group">
                            <label>Nom</label>
                            <input id="per_username" value={newQuizz.qui_name} className="form-control"  type="text" onChange= {e=>setNewQuizz({...newQuizz, qui_name: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-success">Ajouter</button>
                        <button type="button" className="btn btn-danger ml-4" onClick={() => {history.push('/quizz');}}>Annuler</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export {
    New
}
