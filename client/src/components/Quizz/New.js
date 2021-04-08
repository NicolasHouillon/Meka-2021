import React, {useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';


export default function New() {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const [newQuizz,setNewQuizz] = useState({qui_name: "", qui_image: null, person_id: cookies.authToken.user_id, key_value: ""});
    const history = useHistory();


    async function addQuizz(e, q) {
        e.preventDefault();
        const data = new FormData();
        data.append('qui_image', q.qui_image, q.qui_image.name);
        data.append('qui_name', q.qui_name);
        data.append('person_id', cookies.authToken.user_id);
        data.append('key_value', q.key_value);
        await axios.post('http://localhost:8000/quizz/new', data);
        history.push('/quizz');
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto",}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Ajouter un quizz</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={e => addQuizz(e, newQuizz)}>
                        <div className="form-group">
                            <label>Nom</label>
                            <input id="qui_name" value={newQuizz.qui_name} className="form-control"  type="text" onChange= {e=>setNewQuizz({...newQuizz, qui_name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Mot-clé</label>
                            <input id="key_value" value={newQuizz.key_value} className="form-control"  type="text" onChange= {e=>setNewQuizz({...newQuizz, key_value: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Image du quizz</label>
                            <input id="qui_image" className="form-control-file"  type="file" onChange= {e=>setNewQuizz({...newQuizz, qui_image: e.target.files[0]})}/>
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
