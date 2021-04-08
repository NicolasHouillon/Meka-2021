import axios from "axios";
import React, { useEffect, useState } from "react";
import Anwser from "./Anwser";
import {useCookies} from 'react-cookie';

export default function Results(props) {
    const [question, setQuestion] = useState([]);
    const [cookies] = useCookies(['authToken']);

    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+props.quizz)).data;
            if (cookies && cookies.authToken) {
                setQuestion(data);
            } else {
                let tab = [];
                for (let i=0; i<3; i++) {
                    tab.push(data[i]);
                }
                setQuestion(tab);
            }
        };
        getQuestion();

        if (cookies && cookies.authToken) {
            async function editScore() {
                const data = (await axios.get('http://localhost:8000/score/1')).data;
                let personScore = data[0].per_score + props.score;

                console.log(personScore);
                const post = (await axios.post('http://localhost:8000/edit/score/1', { score: personScore }));
            }
            editScore();
        }
    }, []);

    return (
        <>
            <p>
                Votre score : {props.score}
            </p>
            {question.map((question, index) =>
                <div key={index} className="p-3">
                    <p>{question.que_state}</p>
                    <Anwser question={question.id} results={true}/>
                </div>
            )}
        </>
    );
}
