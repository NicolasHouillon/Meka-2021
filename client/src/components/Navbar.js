import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

export default function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const history = useHistory();

    if (cookies && cookies.authToken) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <Link to="/">
                                <li className="nav-item active">
                                    <a className="nav-link"><img src={"http://localhost:8000/img/logo.png"} alt="Layer" style={{height:70}}/></a>
                                </li>
                            </Link>
                            <Link to="/quizz">
                                <li className="nav-item">
                                    <a className="nav-link">Quizz</a>
                                </li>
                            </Link>

                        </ul>
                        <div className="mr-sm-2">
                            <button className="btn btn-danger" onClick={() => {
                                removeCookie("authToken");
                                localStorage.removeItem("token");
                                history.push('/signin');
                            }}>
                                Déconnexion
                            </button>
                        </div>

                    </div>
                </nav>
            </>
        )
    }
    else{
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-content">
                            <ul className="navbar-nav navbar-collapse mr-auto">
                                <Link to="/">
                                    <li className="nav-item active">
                                        <a className="nav-link"><img src={"http://localhost:8000/img/logo.png"} alt="Layer" style={{height:70}}/></a>
                                    </li>
                                </Link>
                                <Link to="/quizz">
                                    <li className="nav-item">
                                        <a className="nav-link">Quizz</a>
                                    </li>
                                </Link>
                            </ul>
                        </div>

                        <div className="mr-sm-2">
                            <Link to="/signup">
                                <button className="btn btn-primary">
                                    S'enregistrer
                                </button>
                            </Link>
                        </div>
                        <div className="mr-sm-2">
                            <Link to="/signin">
                                <button className="btn btn-success">
                                    Se connecter
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
