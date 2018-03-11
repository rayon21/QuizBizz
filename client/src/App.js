import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderGuest from './components/HeaderGuest.js';
import RegistrationBox from './components/RegistrationBox.js';
import QuizzesPage from './components/QuizzesPage';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RegistrationBox}/>
          <Route path="/quizzes" component={QuizzesPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
