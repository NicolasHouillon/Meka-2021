import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Link to="/">
                            <li className="nav-item active">
                                <a className="nav-link">Home <span className="sr-only">(current)</span></a>
                            </li>
                        </Link>
                        <Link to="/quizz">
                            <li className="nav-item">
                                <a className="nav-link">Quizz</a>
                            </li>
                        </Link>
                        <Link to="/signup">
                        <li className="nav-item">
                            <a className="nav-link">S'enregistrer</a>
                        </li>
                        </Link>
                        <Link to="/signin">
                        <li className="nav-item">
                            <a className="nav-link disabled">Se connecter</a>
                        </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}
