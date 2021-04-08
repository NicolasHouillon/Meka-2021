import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import EditQuestion from "./EditQuestion";

export default function Edit() {
    let id = useParams().id;
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const [quizz,setQuizz] = useState({qui_name: "", qui_image: null, person_id: cookies.authToken.user_id});
    const [questions,setQuestions] = useState([]);
    const history = useHistory();


    async function editQuizz(e, q) {
        e.preventDefault();
        const data = new FormData();
        data.append('qui_name', q.qui_name);
        data.append('person_id', cookies.authToken.user_id);
        await axios.post('http://localhost:8000/quizz/edit/'+id, data);
        history.push('/quizz');
    }

    useEffect(() => {
        const getQuizz = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/'+id)).data;
            setQuizz(data[0]);
        };
        getQuizz();

        const getQuestions = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+id)).data;
            setQuestions(data);
        };
        getQuestions();
    }, []);

    return (
        <>
            <div style={{marginTop: 6 + 'em'}}/>
            <div className="card" style={{marginTop: 10 + 'em', width: 50+'%', display: "block", margin: "auto",}}>
                <div className="card-title">
                    <h3 className="align-content-center text-uppercase p-lg-1" style={{backgroundColor: "#2E2E2E", color: "whitesmoke"}}>Editer un quizz</h3>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={e => editQuizz(e, quizz)}>
                        <div className="form-group">
                            <label>Nom</label>
                            <input id="qui_name" value={quizz.qui_name} className="form-control"  type="text" onChange= {e=>setQuizz({...quizz, qui_name: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-success">Ajouter</button>
                        <button type="button" className="btn btn-danger ml-4" onClick={() => {history.push('/quizz');}}>Annuler</button>
                    </form>
                    {questions.map((questions, index) =>
                        <div key={index}>
                            <EditQuestion question={questions.id} quizz={id}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
