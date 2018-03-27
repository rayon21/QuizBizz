import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Question from './Game/Question.js';
import io from "socket.io-client";
import axios from 'axios';

class PresenterPage extends Component {

	constructor() {
		super();
		this.state = {
			question: '',
			roomId: '',
			gameState: '',
			showAnswer: true,
			players: [],
			endpoint: "/",
		    mySocketId: "",
		    quiz: {},
		    currentQuestion: '',
		    currentQuestionNumber: 1
		}
	}

	  componentDidMount() {
	    const { endpoint } = this.state;
	    this.socket = io(endpoint);
	    var r = this;

	    this.socket.emit('createNewQuiz');
	    this.socket.on('quizCreated', function(data){
	        console.log(data.roomId + " " + data.mySocketId);
	        r.setState({ 
	          roomId: data.roomId,
	          mySocketId: data.mySocketId
	        });
	      });
	    this.socket.on('playerJoinedRoom', function(data){
	      console.log(data.playerName);
	      r.setState({ players: [data.playerName, ...r.state.players] });
	    });

	    const token = localStorage.getItem('token');
		axios.get('/api/quizzes/' + window.location.pathname.split("/")[2], {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			console.log(res.data);
			this.setState({quiz: res.data.quiz});
			this.setState({currentQuestion: res.data.quiz.questions[0].question});
		});
	  }

	//updates the current question to the next, returns true if it can, false if not
	nextQuestion = () => {
		if (this.state.quiz && this.state.currentQuestionNumber >= this.state.quiz.questions.length) {
			return false;
		}
		this.setState({
			currentQuestionNumber: this.state.currentQuestionNumber + 1,
			currentQuestion: this.state.quiz.questions[this.state.currentQuestionNumber].question
		});
		return true;
	}

	renderPlayerList() {
		return (
			this.state.players.map((player, index) => {
				return (
					<li className="list-group-item justify-content-between d-flex" key={index}>
						{player}
						<span className="badge badge-default badge-pill">12</span>
					</li>
				)
			})
		)
	}



	render() {
		return ([
			<NavBar/>,
			<div className="container">
				<div className="row mt-5">
					<div className="col-md-3">
						<div className="card">
							<div className="card-body">
								<h5 className="">ROOM CODE: <b>{this.state.roomId}</b></h5>
							</div>
						</div>
						<div className="controls">
							<button className="btn btn-primary mt-3 col-md-12" onClick={this.nextQuestion}>Enable Buzzing</button>
						</div>
						<div className="players-list mt-4">
							<h3 className="mb-3">Players</h3>
							<ul className="list-group">
							  {this.state.players.length == 0 ? (<span className='grey-text'>There are currently no players</span>) : undefined}
							  {this.renderPlayerList()}
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						<div className="container">
      						<Question question={this.state.currentQuestion} key="x"/>
							<Question question="x = 1"/>
							<div className="right-wrong-buttons mt-4 d-flex justify-content-center">
								<button className="btn btn-primary btn-lg">✅</button>
								<button className="btn btn-primary btn-lg">❌</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		])
	}
}

 export default PresenterPage;