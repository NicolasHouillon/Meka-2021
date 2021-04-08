import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Quizz from './components/Quizz/Quizz';
import Game from './components/Game';
import Signin from "./components/authentification/signin";
import Signup from "./components/authentification/signup";
import Navbar from './components/Navbar';
import Home from './components/Home';
import New from './components/Quizz/New';
import NewQuestion from "./components/Quizz/NewQuestion";
import NewAnswer from "./components/Quizz/NewAnswer";

function App() {

  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Route path="/" exact component={Home}/>
            <Route path="/quizz" exact component={Quizz}/>
            <Route path="/quizz/:id" exact component={Game}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/newQuizz" exact component={New}/>
            <Route path="/quizz/newQuestions/:id" exact component={NewQuestion}/>
            <Route path="/quizz/addAnswer/:id" exact component={NewAnswer}/>
        </Router>
    </div>
  );
}

export default App;
