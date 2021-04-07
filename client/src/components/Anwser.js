import {useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Anwser(props) {
    const [anwser, setAnwser] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const getAnwser = async () => {
            const data = (await axios.get('http://localhost:8000/anwser/'+props.question)).data;
            setAnwser(data);
        }
        getAnwser()
    }, []);

    return (
        <>
            <div>
                {anwser.map((anwser, index) =>
                    <p key={index}>{anwser.anw_state}</p>
                )}
            </div>
        </>
    )
}
