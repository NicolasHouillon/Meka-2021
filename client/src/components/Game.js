import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Anwser from "./Anwser";
import Results from "./Results"

export default function Game() {
    const [quizz, setQuizz] = useState([]);
    const [question, setQuestion] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    let { id } = useParams();

    useEffect(() => {
        const getQuizz = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/'+id)).data;
            setQuizz(data);
        }
        getQuizz()
    }, []);

    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+id)).data;
            setQuestion(data);
        }
        getQuestion()
    }, []);

    function suivant() {
        if (currIndex < question.length) {
            setCurrIndex(currIndex+1);
        }
    }

    function Current(props) {
        if (props.index == currIndex) {
            return (
                <div className="p-5">
                    <h5>{props.state}</h5>
                    <Anwser question={props.question} results={false}/>
                </div>
            )
        } else if (currIndex >= question.length && props.index == question.length - 1) {
            return (
                <div>
                    <Results quizz={id}/>
                </div>
            )
        }
        return "";
    }

    return (
        <div>
            <div>
                {quizz.map((quizz, index) =>
                    <h2 key={index}>{quizz.qui_name}</h2>
                )}
            </div>
            <div>
                {question.map((question, index) =>
                    <div key={index}>
                        <Current index={index} state={question.que_state} question={question.id}/>
                    </div>
                )}
            </div>
            <button type="button" className="btn btn-info" onClick={()=>suivant()}>Valider</button>
        </div>
    )
}
