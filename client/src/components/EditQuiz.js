import React, { Component } from 'react';
import axios from 'axios';
import QuestionInput from './QuestionInput.js';
import NavBar from './NavBar.js'

class EditQuiz extends Component {

	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
            questions: [],
            quiz: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.updateQuestion = this.updateQuestion.bind(this);
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

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		})
	}

	addQuestion() {
		var newQuestion = {
			key: Date.now(),
			question: '',
			answer: ''
		}
		this.setState({questions: this.state.questions.concat(newQuestion)});
	}

	updateQuestion(key, question) {
		var newQuestions = this.state.questions.map(el => {
			if (el.key === key) {
				return Object.assign({}, el, question);
			}
			return el
		});
		this.setState({questions: newQuestions});
	}

	removeQuestion = (id) => {
		this.setState({questions: this.state.questions.filter(e=>e.key!==id)});
	}

	renderPreQuestions()  {
        if (!this.state.quiz.questions) {
			return undefined;
		}
		return this.state.quiz.questions.map((question, index) => {
			return (
				<QuestionInput number={index + 1} key={question.key} id={question.key} question={question} updateQuestion={this.updateQuestion} removeQuestion={this.removeQuestion}/>
			)
		})
    }

    renderQuestions() {
		return this.state.questions.map((question, i) => {
			return (
				<QuestionInput number={i + 1} key={question.key} id={question.key} question={question} updateQuestion={this.updateQuestion} removeQuestion={this.removeQuestion}/>
			)
		})
	}

	render() {
        const {title, description} = this.state.quiz;
		return ([
			<NavBar history={this.props.history}/>,
			<div className="container mt-5">
				<h1 className="mt-5">{title}</h1>
				<p>{description}</p>
				
				<div className="container">
                    {this.renderPreQuestions()}
                    {this.renderQuestions()}
				</div>
				<div className="row mt-4">
					<div className="col text-center">
						<button className="btn btn-primary" onClick={this.addQuestion}>Add Question</button>
					</div>
				</div>
				<div className="row">
					<button className="btn btn-primary" onClick={this.handleSubmit}>Done</button>
				</div>
			</div>
		])
	}
}
export default EditQuiz;