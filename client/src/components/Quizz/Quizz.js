import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom';
import {useCookies} from "react-cookie";

export default function Quizz() {
    const [quizz, setQuizz] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [quizzPerKeywords, setQuizzPerKeywords] = useState([]);
    const [currText, setCurrText] = useState(new RegExp(""));
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

    useEffect(() => {
        const getQuizz = async () => {
            const set = (await axios.get('http://localhost:8000/quizz')).data;
            setQuizz(set);
        };
        const getKeywords = async () => {
            const set = (await axios.get('http://localhost:8000/keyword')).data;
            setKeywords(set);
        };
        const getQuizzPerKeywords = async () => {
            const set = (await axios.get('http://localhost:8000/searchByKeyword')).data;
            setQuizzPerKeywords(set);
        };
        getQuizz();
        getKeywords();
        getQuizzPerKeywords();
    }, []);

    async function deleteQuizz(e, params) {
        e.preventDefault();

        await axios.delete('http://localhost:8000/deleteQuizz/'+params);
        document.location.reload();
    }

    function Buttons(props) {
        if (cookies && cookies.authToken) {
            if (cookies.authToken.user_id === props.person) {
                return (
                    <>
                        <form method="delete" onSubmit={e => deleteQuizz(e, props.quizz)}>
                            <button className="btn btn-danger col-lg-4">
                                Delete
                            </button>
                        </form>
                        <Link to={"/quizz/newQuestions/"+props.quizz}>
                            <button className="btn btn-dark col-lg-4">
                                Add question
                            </button>
                        </Link>
                    </>
                );
            }
        }
        return (
            <>
            <Link to={"/quizz/"+props.quizz}>
                <button className="btn btn-dark col-lg-4">
                    Faire le quizz
                </button>
            </Link>
            </>
        );
    }

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
                                        <Buttons person={quizz.person_id} quizz={quizz.id}/>
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
