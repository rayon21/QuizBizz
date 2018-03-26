import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Question from './Game/Question.js';
import io from "socket.io-client";

class PresenterPage extends Component {

	constructor() {
		super();
		this.state = {
			question: '',
			roomId: 'ABCD',
			gameState: '',
			showAnswer: true,
			players: [],
			endpoint: "/",
		    mySocketId: ""
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
							<button className="btn btn-primary mt-3 col-md-12">Enable Buzzing</button>
						</div>
						<div className="players-list mt-4">
							<h3 className="mb-3">Players</h3>
							<ul className="list-group">
							  {this.renderPlayerList()}
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						<div className="container">
      						<Question question="fuck fucking fuck?" key="x"/>
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