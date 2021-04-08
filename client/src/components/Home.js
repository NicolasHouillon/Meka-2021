import React from 'react';
import {Link} from "react-router-dom";

export default function Home() {

    return (
        <>
            <main className="cs-page-wrapper">
                <div className="d-flex align-items-center position-relative bg-size-cover bg-position-center overflow-hidden pt-6 pb-lg-5">
                    <div className="container-fluid pb-5">
                        <div className="row align-items-center py-3">
                            <div className="col-xl-6 col-lg-5 justify-content-end">
                                <div className="pt-2 mx-auto mb-5 mb-lg-0 ml-lg-0 mr-xl-7 text-center" style={{maxWidth: 395 + 'px'}}>
                                    <h1 className="display-4 pb-2 titre">Bienvenue sur Squizzie</h1>
                                    <hr/>
                                    <p className="h4 font-weight-light opacity-70 line-height-base text-left">Testez vos connaissances sur de nombreux sujets grâce aux quizz proposés</p>
                                    <Link to="/quizz">
                                        <a className="font-weight-medium btn-meka mt-3" href='#'>Voir les quizz</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7">
                                <img src={"http://localhost:8000/img/home.png"} alt="Layer" style={{height:600}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
