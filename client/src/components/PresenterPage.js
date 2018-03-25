import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Question from './Game/Question.js';

class PresenterPage extends Component {

	constructor() {
		super();
		this.state = {
			question: '',
			roomCode: 'ABCD',
			players: ["Jane Doe", "Parmis", "Richarde"]
		}
	}

	didComponentMount() {

	}

	renderPlayerList() {
		return (
			this.state.players.map((player, index) => {
				return (
					<li className="list-group-item justify-content-between" key={index}>
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
								<h5 className="">ROOM CODE: <b>{this.state.roomCode}</b></h5>
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
							<Question question="x^2/34 + x = 43?"/>
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