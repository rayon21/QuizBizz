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
			showAnswer: false,
			players: [],
			answerQueue: [],
			endpoint: "/",
		    mySocketId: "",
		    quiz: {},
		    currentQuestion: '',
		    currentAnswer: '',
		    currentQuestionNumber: 1
		};
		this.handleEnableBuzzer = this.handleEnableBuzzer.bind(this);
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
	      //console.log(data.playerName);
	      r.setState({ players: [
	      	{
	      		playerName: data.playerName,
	      		points: 0
	      	},

	      	...r.state.players] });
	    });
	    //when someone clicks the button
	    this.socket.on('joinQuizQueue',function(data){
	    	console.log("PUSHED BUTTON: " + data.playerName);
	    	r.setState({ answerQueue: r.state.answerQueue.concat([data.playerName])});

	    });

	    const token = localStorage.getItem('token');
		axios.get('/api/quizzes/' + window.location.pathname.split("/")[2], {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			const firstQuestion = res.data.quiz.questions[0];
			this.setState({quiz: res.data.quiz});
			this.setState({currentQuestion: firstQuestion.question, currentAnswer: firstQuestion.answer});
		});
	  }
	
	//updates the current question to the next, returns true if it can, false if not
	nextQuestion = () => {
		if (this.state.quiz && this.state.currentQuestionNumber >= this.state.quiz.questions.length) {

			this.setState({
				answerQueue: [],
				players: this.state.players				
			});

			// should update mongo DB Participants
			// should load page of winners in table

			var r = this;
		    const token = localStorage.getItem('token');
		    console.log("QUIZ ENDED, MONGO UPDATED");
			console.log(token);
			axios.patch('/api/quizzes/' + window.location.pathname.split("/")[2],
			 {
			 	participants: this.state.players
			 },
			 {
				headers: {
					"x-auth": token
				}
			}).then((res) => {
				console.log(res);
			});
			
			return false;
		}

		this.setState({
			currentQuestionNumber: this.state.currentQuestionNumber + 1,
			currentQuestion: this.state.quiz.questions[this.state.currentQuestionNumber].question,
			currentAnswer: this.state.quiz.questions[this.state.currentQuestionNumber].answer,
			answerQueue: [],
			players: this.state.players
		});
		return true;

	    // this.socket.emit('enableBuzzer', r.state.roomId);
	  }
	  
	nextPlayer = () => {
	 	if(this.state.answerQueue.length > 0){
			this.state.answerQueue.splice(0,1);
		    this.setState({
			  answerQueue: this.state.answerQueue
			});
	 	}
	 }

	showAnswer = () => {
	 	this.setState({showAnswer: true})
	}

	hideAnswer = () => {
	 	this.setState({showAnswer: false})
	}

	correctAnswer = () => {
	    // add points to first element in the list
	    if(this.state.answerQueue.length > 0){
			var index = this.state.players.map(function(e) { return e.playerName;}).indexOf(this.state.answerQueue[0]);
			this.state.players[index].points += 1;
		} 
		this.nextQuestion();
	}

	handleEnableBuzzer(e){
		e.preventDefault();
		var r = this;
	    this.socket.emit('enableBuzzer', r.state.roomId);
	}

	renderPlayerList() {
		return (
			this.state.players.map((player, index) => {
				return (
					<li className="list-group-item justify-content-between d-flex" key={index}>
						{player.playerName}
						<span className="badge badge-default badge-pill">
						{player.points}
						</span>
					</li>
				)
			})
		)
	}

	renderAnswerQueue(){
		return(
			this.state.answerQueue.map(function(player, index){
		      return <li key={index}><b>{player}</b></li>
		    })
		)
	}


	render() {
		return ([
			<NavBar history={this.props.history}/>,
			<div className="container">
				<div className="row mt-5">
					<div className="col-md-3">
						<div className="card">
							<div className="card-body">
								<h5 className="">ROOM CODE: <b>{this.state.roomId}</b></h5>
							</div>
						</div>
						<div className="controls">
							<button className="btn btn-primary mt-3 col-md-12" 
								onClick={this.handleEnableBuzzer} >Enable Buzzing
							</button>
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
      						{this.state.showAnswer ? <Question question={this.state.currentAnswer}/> : undefined}
							{this.renderAnswerQueue()}
							<div className="right-wrong-buttons mt-4 d-flex justify-content-between">
								<button className="btn btn-primary btn-lg col mr-4" onClick={this.correctAnswer}>✅</button>
								<button className="btn btn-primary btn-lg col mr-4" onClick={this.nextPlayer}>❌</button>
								<button className="btn btn-primary btn-lg col mr-4" onClick={this.showAnswer}>Show answer</button>
								<button className="btn btn-primary btn-lg col" onClick={this.nextQuestion}>Skip</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		])
	}
}

 export default PresenterPage;