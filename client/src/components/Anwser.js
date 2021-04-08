import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Anwser(props) {
    const [anwser, setAnwser] = useState([]);
    const [check, setCheck] = useState(0);

    let results = props.results;
    let response = 0;
    let image = props.image;

    useEffect(() => {
        const getAnwser = async () => {
            const data = (await axios.get('http://localhost:8000/anwser/'+props.question)).data;
            setAnwser(data);

            let res = 0;
            for (let i=0; i<data.length; i++) {
                if (data[i].anw_is_true === true) {
                    res += 1;
                }
            }
            setCheck(res);
        };
        getAnwser()
    }, []);

    function selectAnwser(is_true, index, image) {
        let btn = document.getElementById('btn'+index);
        if(image) {
            if (btn.className === 'btn-answer-image-select') {
                btn.className = 'btn-answer-image';
                if (is_true === true) {
                    response -= 1;
                } else {
                    response += 1;
                }
            } else {
                btn.className = 'btn-answer-image-select';
                if (is_true === true) {
                    response += 1;
                } else {
                    response -= 1;
                }
            }
        } else {
            if (btn.className === 'btn-answer-select') {
                btn.className = 'btn-answer';
                if (is_true === true) {
                    response -= 1;
                } else {
                    response += 1;
                }
            } else {
                btn.className = 'btn-answer-select';
                if (is_true === true) {
                    response += 1;
                } else {
                    response -= 1;
                }
            }
        }

        document.getElementById('score').value = props.points;
        document.getElementById('check').value = check;
        document.getElementById('response').value = response;
    }

    function Anwsers(props) {
        if(image === true){
            if (results === false) {
                return <button key={props.index} id={'btn'+props.index} className="btn-answer-image" onClick={() => selectAnwser(props.istrue, props.index, image)}><img src={"http://localhost:8000/img/"+props.state} alt="Layer" style={{maxWidth:200}}/></button>
            } else {
                if (props.istrue === false) {
                    return <button key={props.index} id={'btn'+props.index} className="btn-answer-image-fin"><img src={"http://localhost:8000/img/"+props.state} alt="Layer" style={{maxWidth:200}}/></button>
                } else {
                    return <button key={props.index} id={'btn'+props.index} className="btn-answer-image-true-fin"><img src={"http://localhost:8000/img/"+props.state} alt="Layer" style={{maxWidth:200}}/></button>
                }
            }
        } else {
            if (results === false) {
                return <button key={props.index} id={'btn'+props.index} className="btn-answer" onClick={() => selectAnwser(props.istrue, props.index, image)}>{props.state}</button>
            } else {
                if (props.istrue === false) {
                    return <button key={props.index} id={'btn'+props.index} className="btn-answer-fin">{props.state}</button>
                } else {
                    return <button key={props.index} id={'btn'+props.index} className="btn-answer-true-fin">{props.state}</button>
                }
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-12 d-content">
                        {anwser.map((anwser, index) =>
                            <div key={index} className="col-5 m-3">
                                <Anwsers index={index} istrue={anwser.anw_is_true} state={anwser.anw_state} image={image}/>
                            </div>,
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
