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
                <main className="cs-page-wrapper">
                    <div className="d-flex align-items-center position-relative bg-position-center overflow-hidden container">
                        <div className="row align-items-center">
                            <select id="filter_searchbar" className="form-control w-25 mt-5 col-4 custom-select" style={{display: "block",margin: "auto"}} onChange={e => setCurrText(new RegExp(e.target.value))}>
                                <option value="default">Sélectionner un mot-clé</option>
                                {keywords.map((keywords, index) => <option key={index}>{keywords.key_value}</option>)}
                            </select>
                            <div className="col-12 container">
                                <div className="row justify-content-around" style={{display: "flex"}}>
                                    {quizz
                                        .map((quizz, index) =>
                                            <div key={index} className="col-6">
                                                <Card style={{width: 450}} className="m-lg-5 carte">
                                                    <div style={{height: 300}}>
                                                        <img className="photo-brightness image-quizz" src={"http://localhost:8000/img/" + quizz.qui_image} alt="coucou"/>
                                                        <h3 className="titre-quizz">{quizz.qui_name}</h3>
                                                    </div>

                                                    <div className="col-12 btn-quizz-bg">
                                                        <Link to={"/quizz/"+quizz.id}>
                                                            <button className="btn-quizz col-lg-4">
                                                                Faire le quizz
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </Card>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
    else{
        console.log(quizzPerKeywords);
        return (
            <>
                <main className="cs-page-wrapper">
                    <div className="d-flex align-items-center position-relative bg-position-center overflow-hidden container">
                        <div className="row align-items-center">
                            <select id="filter_searchbar" className="form-control w-25 mt-5 col-4 custom-select" style={{display: "block",margin: "auto"}} onChange={e => setCurrText(new RegExp(e.target.value))}>
                                <option value="default">Sélectionner un mot-clé</option>
                                {keywords.map((keywords, index) => <option key={index}>{keywords.key_value}</option>)}
                            </select>
                            <div className="col-12 container">
                                <div className="row justify-content-around" style={{display: "flex"}}>
                                    {quizz
                                        .map((quizz, index) =>
                                            <div key={index} className="col-6">
                                                <Card style={{width: 450}} className="m-lg-5 carte">
                                                    <div style={{height: 300}}>
                                                        <img className="photo-brightness image-quizz" src={"http://localhost:8000/img/" + quizz.qui_image} alt="coucou"/>
                                                        <h3 className="titre-quizz">{quizz.qui_name}</h3>
                                                    </div>
                                                    <div className="col-12 btn-quizz-bg">
                                                        <Link to={"/quizz/"+quizz.id}>
                                                            <button className="btn-quizz col-lg-4">
                                                                Faire le quizz
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </Card>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }



}
