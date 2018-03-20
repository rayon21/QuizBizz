import React, { Component } from 'react';
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
		return (
			<div className="container">
				<h1>{title}</h1>
				<p>{description}</p>
				<div className="row">
					<div className="col">
						<button className="btn btn-primary">Play Now</button>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between">
									<p className="">Question 1: What is criminology?</p>
									<button className="btn btn-primary">Edit</button>
								</div>
							</div>
							<div className="d-flex flex-wrap mb-4">
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">A: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">B: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">C: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">D: Hello</button>
									</div>
								</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col text-center">
						<div className="btn btn-primary">Add Question</div>
					</div>
				</div>
			</div>
		)
	}
}

export default QuizPage;