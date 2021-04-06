import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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

      </header>
    </div>
  );
}

export default App;
