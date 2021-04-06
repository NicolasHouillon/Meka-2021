import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Nav, Navbar, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Quizz from './components/Quizz';
import Signin from "./components/authentification/signin";
import {Signup} from "./components/authentification/signup";

function App() {

  return (
    <div className="App">
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#features">Quizz</Nav.Link>
                <Nav.Link href="#pricing">Compte</Nav.Link>
            </Nav>
        </Navbar>
        <header className="App-header">
            <Signin/>
        </header>
    </div>
  );
}

export default App;
