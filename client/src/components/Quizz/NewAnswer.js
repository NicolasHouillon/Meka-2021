import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';


export default function NewAnswer() {
    let {id} = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const [quizz, setQuizz] = useState([]);
    const [newAnswer, setNewAnswer] = useState({anw_is_true: "", anw_state: "", que_id: id});
    const history = useHistory();

    async function addAnswer(e, a) {
        e.preventDefault();

        const anwsers = await axios.get('http://localhost:8000/anwser/'+id);
        if (anwsers.data.length < 4) {
            const data = new FormData();
            data.append('anw_is_true', a.anw_is_true);
            data.append('anw_state', a.anw_state);
            data.append('que_id', id);
            //const question = axios.get('http://localhost:8000/getQuestion')
            await axios.post('http://localhost:8000/quizz/newAnswer', data);
            const resp = await axios.get('http://localhost:8000/getQuestion/'+id);
            document.location.reload();
        } else {
            alert('vous ne pouvez plus ajouter de question !');
            history.push('/quizz');
        }
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto"}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Ajouter un quizz</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={e => addAnswer(e, newAnswer)}>
                        <div className="form-group">
                            <label>The Answer</label>
                            <input id="que_state" value={newAnswer.anw_state} className="form-control"  type="text" onChange= {e=>setNewAnswer({...newAnswer, anw_state: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Est-ce une image ? Inshallah peut être</label><br/>
                            <input type="radio" value="t" name="anw_is_true" id="anw_is_true" onChange= {e=>setNewAnswer({...newAnswer, anw_is_true: e.target.value})}/> Oui
                            <input type="radio" className="ml-3" value="f" name="anw_is_true" id="anw_is_true" onChange= {e=>setNewAnswer({...newAnswer, anw_is_true: e.target.value})}/> Non
                        </div>
                        <button type="submit" className="btn btn-success">Ajouter</button>
                        <button type="button" className="btn btn-danger ml-4" onClick={() => {history.push('/quizz');}}>Retour</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export {
    NewAnswer
}
