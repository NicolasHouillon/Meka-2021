import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Quizz from './components/Quizz';
import Signin from "./components/authentification/signin";
import Signup from "./components/authentification/signup";
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Route path="/" exact component={Home}/>
            <Route path="/quizz" exact component={Quizz}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
        </Router>
    </div>
  );
}

export default App;
