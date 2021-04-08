import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditAnwser from "./EditAnwser";

export default function EditQuestion(props) {
    let id = props.question;
    let quizz_id = props.quizz;
    const [question,setQuestion] = useState({que_state: "", que_points: "", que_is_image: "", quizz_id: quizz_id});
    const [anwsers,setAnwsers] = useState([]);

    async function editQuestion(e, param) {
        e.preventDefault();

        let points = parseInt(param.que_points);
        let int_id = parseInt(quizz_id);
        const data = new FormData();
        data.append('que_state', param.que_state);
        data.append('que_points', points);
        data.append('que_is_image', param.que_is_image);
        data.append('quizz_id', int_id);

        await axios.post('http://localhost:8000/quizz/edit/question/'+id, data);
        document.location.reload();
    }


    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/questions/'+id)).data;
            setQuestion(data[0]);
            console.log('aaa');
        };
        getQuestion();

        const getAnwsers = async () => {
            const data = (await axios.get('http://localhost:8000/anwser/'+id)).data;
            setAnwsers(data);
        };
        getAnwsers();
    }, []);

    return (
        <>
            <div style={{marginTop: 2 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', display: "block", margin: "auto"}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Editer une question</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={e => editQuestion(e, question)}>
                        <div className="form-group">
                            <label>Question</label>
                            <input id="que_state" value={question.que_state} className="form-control"  type="text" onChange= {e=>setQuestion({...question, que_state: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Point(s)</label>
                            <input id="que_points" value={question.que_points} className="form-control"  type="text" onChange= {e=>setQuestion({...question, que_points: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Est-ce une image ?</label><br/>
                            <input type="radio" value="t" name="que_is_image" id="que_is_image" onChange= {e=>setQuestion({...question, que_is_image: e.target.value})}/> Oui
                            <input type="radio" className="ml-3" checked={!question.que_is_image} value="f" name="que_is_image" id="que_is_image" onChange= {e=>setQuestion({...question, que_is_image: e.target.value})}/> Non
                        </div>
                        <button type="submit" className="btn btn-success">Editer</button>
                    </form>
                    <h3 className="align-content-center text-uppercase p-lg-1 mt-3" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Editer les réponse</h3>
                    {anwsers.map((anwser, index) =>
                        <div key={index}>
                            <EditAnwser anwser={anwser.id} question={id}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
