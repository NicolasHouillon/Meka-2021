import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Nav, Navbar, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Quizz from './components/Quizz';
import Signin from "./components/authentification/signin";
import {Signup} from "./components/authentification/signup";
import {Link, Router} from "@reach/router";

function App() {

  return (
    <div className="App">
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/quizz">Quizz</Link>
                <Link to="/connexion">Se connecter</Link>
                <Link to="/enregistrement">S'enregistrer</Link>
            </Nav>
        </Navbar>
        <header className="App-header">
            <Router>
                <Quizz path="/quizz"/>
                <Signup path="/connexion"/>
                <Signin path="/enregistrement"/>
            </Router>
            <h1>Bienvenu sur l'application de quizz !</h1>
        </header>
    </div>
  );
}

export default App;
