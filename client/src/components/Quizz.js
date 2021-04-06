import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

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
            <div className="row" style={{display: "flex"}}>
                {quizz.map((quizz) =>
                    <div className="col-lg-6">
                        <Card style={{width: 452}} className="m-lg-5">
                            <img src={"http://localhost:8000/img/" + quizz.image} height="300px" width="450px"/>
                            <h3 className="text-dark">{quizz.name}</h3>

                            <div className="col-12 text-right mb-2">
                                <button className="btn btn-dark col-lg-4">
                                    Faire le quizz
                                </button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    )
}
