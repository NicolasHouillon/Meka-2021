import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';


export default function NewQuestion() {
    let {id} = useParams();
    const [newQuestion,setNewQuestion] = useState({que_state: "", que_points: "", que_is_image: "", quizz_id: id});
    const history = useHistory();

    async function addQuestion(e, q) {
        e.preventDefault();
        let points = parseInt(q.que_points);
        let int_id = parseInt(id);
        const data = new FormData();
        data.append('que_state', q.que_state);
        data.append('que_points', points);
        data.append('que_is_image', q.que_is_image);
        data.append('quizz_id', int_id);
        await axios.post('http://localhost:8000/quizz/newQuestion', data);
        const resp = await axios.get('http://localhost:8000/getQuestion/'+id);
        history.push('/quizz/addAnswer/'+resp.data[0].id);
    }

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto"}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Ajouter une question</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={e => addQuestion(e, newQuestion)}>
                        <div className="form-group">
                            <label>Question</label>
                            <input id="que_state" value={newQuestion.que_state} className="form-control"  type="text" onChange= {e=>setNewQuestion({...newQuestion, que_state: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Point(s)</label>
                            <input id="que_points" value={newQuestion.que_points} className="form-control"  type="text" onChange= {e=>setNewQuestion({...newQuestion, que_points: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Est-ce une image ?</label><br/>
                            <input type="radio" value="t" name="que_is_image" id="que_is_image" onChange= {e=>setNewQuestion({...newQuestion, que_is_image: e.target.value})}/> Oui
                            <input type="radio" className="ml-3" value="f" name="que_is_image" id="que_is_image" onChange= {e=>setNewQuestion({...newQuestion, que_is_image: e.target.value})}/> Non
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
    NewQuestion
}
