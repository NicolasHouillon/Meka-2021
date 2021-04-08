import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Anwser(props) {
    const [anwser, setAnwser] = useState([]);
    const [check, setCheck] = useState(0);

    let results = props.results;
    let response = 0;

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

    function selectAnwser(is_true, index) {
        let btn = document.getElementById('btn'+index);

        if (btn.className === 'btn btn-primary col-10') {
            btn.className = 'btn btn-secondary col-10';
            if (is_true === true) {
                response -= 1;
            } else {
                response += 1;
            }
        } else {
            btn.className = 'btn btn-primary col-10';
            if (is_true === true) {
                response += 1;
            } else {
                response -= 1;
            }
        }

        document.getElementById('score').value = props.points;
        document.getElementById('check').value = check;
        document.getElementById('response').value = response;
    }

    function Anwsers(props) {
        if (results === false) {
            return <button key={props.index} id={'btn'+props.index} className="btn btn-secondary col-10 anwser" onClick={() => selectAnwser(props.istrue, props.index)}>{props.state}</button>
        } else {
            if (props.istrue === false) {
                return <button key={props.index} id={'btn'+props.index} className="btn btn-secondary anwser col-10">{props.state}</button>
            } else {
                return <button key={props.index} id={'btn'+props.index} className="btn btn-success anwser col-10">{props.state}</button>
            }
        }
    }

    return (
        <>
            <div className="row">
                <div className="d-flex col-12 p-3 anwsers">
                    {anwser.map((anwser, index) =>
                        <div key={index} className="col-3 p-relative">
                            <Anwsers index={index} istrue={anwser.anw_is_true} state={anwser.anw_state}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
