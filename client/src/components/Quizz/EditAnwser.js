import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditAnwser(props) {
    let id = props.anwser;
    let que_id = props.question;
    const [anwser,setAnwser] = useState({anw_state: "", anw_is_true: "", que_id: que_id});

    async function editAnwser(e, param) {
        e.preventDefault();
        const data = new FormData();
        data.append('anw_state', param.anw_state);
        data.append('anw_is_true', param.anw_is_true);
        data.append('que_id', que_id);

        await axios.post('http://localhost:8000/quizz/edit/anwser/'+id, data);
        document.location.reload();
    }


    useEffect(() => {
        const getAnwser = async () => {
            const data = (await axios.get('http://localhost:8000/unique/anwser/'+id)).data;
            setAnwser(data[0]);
            console.log('aaa');
        };
        getAnwser();
    }, []);

    return (
        <>
            <div style={{marginTop: 10 + 'em', display: "block", margin: "auto"}}>
                <form method="post" onSubmit={e => editAnwser(e, anwser)}>
                    <div className="form-group">
                        <input id="que_state" value={anwser.anw_state} className="form-control"  type="text" onChange= {e=>setAnwser({...anwser, anw_state: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Est-ce une image ?</label><br/>
                        <input type="radio" value="t" checked={anwser.anw_is_true} name="anw_is_true" id="anw_is_true" onChange= {e=>setAnwser({...anwser, anw_is_true: e.target.value})}/> Oui
                        <input type="radio" className="ml-3" value="f" name="anw_is_true" id="anw_is_true" onChange= {e=>setAnwser({...anwser, anw_is_true: e.target.value})}/> Non
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>
                </form>
            </div>
        </>
    );
}
