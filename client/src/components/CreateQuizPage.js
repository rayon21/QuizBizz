import React, { Component } from 'react';
import axios from 'axios';
import QuestionInput from './QuestionInput.js';

class CreateQuizPage extends Component {

	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			questions: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.updateQuestion = this.updateQuestion.bind(this);
	}

	handleSubmit(e) {
		const token = localStorage.getItem('token');
		axios.post('/api/quizzes', {
			title: this.state.title,
			description: this.state.description,
			questions: this.state.questions
		}, {headers: {
			'x-auth': token
		}}).then((res) => {
			this.props.history.push("/quiz/" + res.data._id);
		});
	}

	handleInput(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	addQuestion() {
		this.setState({questions: [...this.state.questions, ""]});
	}

	updateQuestion(index, question) {
		var questionsArray = [...this.state.questions];
		questionsArray[index] = question;
		this.setState({
			questions: questionsArray
		})
	}

	renderQuestions() {
		return this.state.questions.map((question, i) => {
			return (
				<QuestionInput number={i + 1} key={i} question={question} updateQuestion={this.updateQuestion}/>
			)
		})
	}

	render() {
		return (
			<div className="container mt-5">
				<div className="form-group">
					<label htmlFor="title">Title: </label>
					<input type="text" className="form-control" id="tile" name="title"  onChange={this.handleInput}/>
				</div>
				<div className="form-group">
					<label htmlFor="name">Description: </label>
					<input type="text" className="form-control" id="description" name="description" onChange={this.handleInput}/>
				</div>
				<div className="container">
					{this.renderQuestions()}
				</div>
				<div className="row">
					<div className="col text-center">
						<button className="btn btn-primary" onClick={this.addQuestion}>Add Question</button>
					</div>
				</div>
				<div className="row">
					<button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
				</div>
			</div>
		)
	}
}

export default CreateQuizPage;