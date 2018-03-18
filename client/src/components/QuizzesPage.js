import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuizzesPage extends Component {
	render() {
		return (
			<div className="container">
				<h1>Quizzes</h1>
				<Link to="/create"><button className="btn btn-primary">New</button></Link>
				<div className="container col-sm-3">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Chapter1 Quiz</h5>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default QuizzesPage;