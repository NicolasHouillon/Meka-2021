import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Anwser from "./Anwser";
import Results from "./Results";
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function Game() {
    const [quizz, setQuizz] = useState([]);
    const [question, setQuestion] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [cookies] = useCookies(['authToken']);

    let { id } = useParams();

    useEffect(() => {
        const getQuizz = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/'+id)).data;
            setQuizz(data);
        };
        getQuizz()
    }, []);

    useEffect(() => {
        const getQuestion = async () => {
            const data = (await axios.get('http://localhost:8000/quizz/questions/'+id)).data;
            setQuestion(data);
        };
        getQuestion()
    }, []);

    function suivant() {
        if (currIndex < question.length) {
            let points = document.getElementById('score').value;
            let check = document.getElementById('check').value;
            let response = document.getElementById('response').value;

            if (check === response) {
                setScore(score + parseInt(points));
            }
            setCurrIndex(currIndex+1);
        }
    }

    function Current(props) {
        if (cookies && cookies.authToken) {
            if (props.index === currIndex) {
                return (
                    <div className="p-5">
                        <h5>{props.state}</h5>
                        <Anwser question={props.question} results={false} points={props.points}/>
                    </div>
                )
            } else if (currIndex >= question.length && props.index === question.length - 1) {
                return (
                    <div>
                        <Results quizz={id} score={score}/>
                    </div>
                )
            }
        } else {
            if (props.index < 3 && props.index === currIndex) {
                return (
                    <div className="p-5">
                        <h5>{props.state}</h5>
                        <Anwser question={props.question} results={false} points={props.points}/>
                    </div>
                )
            } else if (currIndex >= 3 && props.index === 2) {
                return (
                    <div>
                        <Results quizz={id} score={score}/>
                    </div>
                )
            }
        }
        return "";
    }

    function Button() {
        if (cookies && cookies.authToken) {
            if (currIndex >= question.length) {
                return (
                    <Link to="/quizz">
                        <button type="button" className="btn btn-info">Retour aux quizz</button>
                    </Link>
                );
            } else {
                return <button type="button" className="btn btn-info valider" onClick={()=>suivant()}>Valider</button>;
            }
        } else {
            if (currIndex >= 3) {
                return (
                    <Link to="/quizz">
                        <button type="button" className="btn btn-info">Retour aux quizz</button>
                    </Link>
                );
            } else {
                return <button type="button" className="btn btn-info valider" onClick={()=>suivant()}>Valider</button>;
            }
        }
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
                        <Current index={index} state={question.que_state} question={question.id} points={question.que_points}/>
                    </div>
                )}
            </div>
            <Button/>
            <input type="hidden" id="score" name="score" value={0}/>
            <input type="hidden" id="check" name="check" value={0}/>
            <input type="hidden" id="response" name="response" value={0}/>
        </div>
    )
}
