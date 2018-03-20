import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuizzesPage extends Component {

	constructor() {
		super();
		this.state = {
			quizzes: []
		}
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		axios.get('/api/quizzes/', {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			this.setState({quizzes: res.data.quizzes});
		});
	}

	renderQuizzes() {
		return this.state.quizzes.map((quiz) => {
			const url = "/quiz/" + quiz._id;
			return (
				<div className="card" key={quiz._id}>
					<Link to={url}>
						<div className="card-body">
							<h5 className="card-title">{quiz.title}</h5>
							<p>{quiz.description}</p>
						</div>
					</Link>
				</div>
			)
		});
	}

	render() {
		return (
			<div className="container">
				<h1>Quizzes</h1>
				<Link to="/create"><button className="btn btn-primary">New</button></Link>
				<div className="container col-sm-3">
					{this.renderQuizzes()}
				</div>
			</div>
		)
	}
}

export default QuizzesPage;