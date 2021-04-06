import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quizz() {
    const [quizz, setQuizz] = useState([]);
    let set = [];

    async function getQuizz() {
        try {
            set = (await axios.get('http://localhost:8000/quizz')).data;
        } catch (err) {
            alert(err);
        } finally {
            setQuizz(set);
        }
    }

    useEffect(() => {
        getQuizz()
    }, []);

    return (
        <>
            <ol>
                {quizz.map((quizz, index) =>
                    <li key={index}>
                        {quizz.name} ---
                        {quizz.keywords}
                    </li>
                )}
            </ol>
        </>
    )
}
