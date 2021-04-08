import axios from "axios";
import React, { useEffect, useState } from "react";
import Anwser from "./Anwser";
import {useCookies} from 'react-cookie';

export default function Results(props) {
    const [question, setQuestion] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+props.quizz)).data;
            setQuestion(data);
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
            <div className="container mt-5 mb-5">
                <div className="row justify-content-around">
                    <p className="score">
                        Votre score : {props.score}
                    </p>
                </div>
            </div>
            {question.map((question, index) =>
                <div className="container">
                    <div className="row justify-content-around">
                        <div key={index} className="p-3 result">
                            <p className="quizz-anwser">{question.que_state}</p>
                            <Anwser question={question.id} results={true} image={question.que_is_image}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
