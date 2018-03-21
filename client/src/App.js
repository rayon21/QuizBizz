import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderGuest from './components/HeaderGuest.js';
import RegistrationBox from './components/RegistrationBox.js';
import LoginBox from './components/LoginBox.js';
import QuizzesPage from './components/QuizzesPage';
import QuizPage from './components/QuizPage';
import CreateQuizPage from './components/CreateQuizPage';
import SocketClient from './components/SocketClient';
import PresenterPage from './components/PresenterPage';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RegistrationBox}/>
          <Route exact path="/login" component={LoginBox}/>
          <Route path="/quizzes" component={QuizzesPage}/>
          <Route path="/quiz" component={QuizPage}/>
          <Route path="/create" component={CreateQuizPage}/>
          <Route path="/join" component={SocketClient}/>
          <Route path="/room/:id" component={PresenterPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
