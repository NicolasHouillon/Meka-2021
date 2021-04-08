import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom';

export default function Quizz() {
    const [quizz, setQuizz] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [quizzPerKeywords, setQuizzPerKeywords] = useState([]);
    const [currText, setCurrText] = useState(new RegExp(""));

    useEffect(() => {
        const getQuizz = async () => {
            const set = (await axios.get('http://localhost:8000/quizz')).data;
            setQuizz(set);
        }
        const getKeywords = async () => {
            const set = (await axios.get('http://localhost:8000/keyword')).data;
            setKeywords(set);
        }
        const getQuizzPerKeywords = async () => {
            const set = (await axios.get('http://localhost:8000/searchByKeyword')).data;
            setQuizzPerKeywords(set);
        }
        getQuizz();
        getKeywords();
        getQuizzPerKeywords();
    }, []);


    if(currText.test("default")){
        return (
            <>
                <Link to={"/newQuizz"}>
                    <button className="btn btn-dark col-lg-4">
                        Créer un quizz
                    </button>
                </Link>
                <select id="filter_searchbar" className="form-control w-25 mt-5" style={{display: "block", margin: "auto"}} onChange={e => setCurrText(new RegExp(e.target.value))}>
                    <option value="default">Sélectionner un mot-clé</option>
                    {keywords.map((keywords, index) => <option>{keywords.key_value}</option>)}
                </select>
                <div className="row" style={{display: "flex"}}>
                    {quizz
                        .map((quizz, index) =>
                            <div key={index} className="col-lg-6">
                                <Card style={{width: 452}} className="m-lg-5">
                                    <img src={"http://localhost:8000/img/" + quizz.qui_image} height="300px" width="450px" alt="coucou"/>
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
    else{
        return (
        <>
                <Link to={"/newQuizz"}>
                    <button className="btn btn-dark col-lg-4">
                        Créer un quizz
                    </button>
                </Link>
                <select id="filter_searchbar" className="form-control w-25 mt-5" style={{display: "block", margin: "auto"}} onChange={e => setCurrText(new RegExp(e.target.value))}>
                    <option value="default">Sélectionner un mot-clé</option>
                    {keywords.map((keywords, index) => <option key={index}>{keywords.key_value}</option>)}
                </select>
                <div className="row" style={{display: "flex"}}>
                    {quizzPerKeywords
                        .filter(quizz => currText.test(quizz.key_value))
                        .map((quizz, index) =>
                            <div key={index} className="col-lg-6">
                                <Card style={{width: 452}} className="m-lg-5">
                                    <img src={"http://localhost:8000/img/" + quizz.qui_image} height="300px" width="450px" alt="coucou"/>
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



}
