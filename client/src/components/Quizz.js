import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quizz() {

    const [quizz, setQuizz] = useState([]);

    async function getQuizz() {
        try {
            const quizz = (await axios.get('http://localhost:8000/quizz')).data;
            console.log(quizz);
        } catch (err) {
            alert(err);
        } finally {
            setQuizz(quizz);
        }
    }

    useEffect(() => {
        getQuizz()
    }, []);

    return (
        <>
            <ol>
                {quizz.map((objet, index) =>
                    <li key={index}>
                        <button
                            onClick={() => {
                                alert('ALERT :  vous avez cliqué sur lobjet :' +  objet.name)
                            }}
                        >
                            {objet.name}
                        </button>
                        {objet.keywords}
                    </li>
                )}
            </ol>
        </>
    )
}