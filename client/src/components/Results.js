import axios from "axios";
import React, { useEffect, useState } from "react";
import Anwser from "./Anwser";

export default function Results(props) {
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+props.quizz)).data;
            setQuestion(data);
        }
        getQuestion()
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
