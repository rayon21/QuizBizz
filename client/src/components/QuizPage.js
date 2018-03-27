import React, { Component } from 'react';
import NavBar from './NavBar.js'
import axios from 'axios';

class QuizPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			quiz: {}

		}
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		axios.get('/api/quizzes/' + window.location.pathname.split("/")[2], {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			this.setState({quiz: res.data.quiz});
		});
	}

	render() {

		const {title, description} = this.state.quiz;
		return ([
			<NavBar/>,
			<div className="container">
				<h1 className="mt-5">{title}</h1>
				<p>{description}</p>
				<div className="row">
					<div className="col">
						<button className="btn btn-primary">Play Now</button>
					</div>
				</div>
			</div>
		])
	}
}

export default QuizPage;