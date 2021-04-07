import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom';

export default function Quizz() {
    const [quizz, setQuizz] = useState([]);

    useEffect(() => {
        const getQuizz = async () => {
            const set = (await axios.get('http://localhost:8000/quizz')).data;
            setQuizz(set);
        }
        getQuizz()
    }, []);

    return (
        <>
            <div className="row" style={{display: "flex"}}>
                {quizz.map((quizz, index) =>
                    <div key={index} className="col-lg-6">
                        <Card style={{width: 452}} className="m-lg-5">
                            <img src={"http://localhost:8000/img/" + quizz.qui_image} height="300px" width="450px"/>
                            <h3 className="text-dark">{quizz.qui_name}</h3>

                            <div className="col-12 text-right mb-2">
                                <Link to={"/quizz/"+quizz.id}>
                                    <button className="btn btn-dark col-lg-4">
                                        Faire le quizz
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    )
}
