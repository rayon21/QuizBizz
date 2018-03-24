import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuestionInput extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
		}
	}

	handleChange(e) {
		const questionAnswer = {
			question: this.refs.questionText.value,
			answer: this.refs.answerText.value
		}
		this.props.updateQuestion(this.props.number - 1, questionAnswer);
		console.log(this.refs.answerText.value);
	}

	didComponentMount() {
		this.setState({question: this.props.question});
	}

	render() {
		return (
			<div className="form-group">
				<label htmlFor="">{this.props.number}</label>
				<input className="question" type="text" className="form-control" ref="questionText" onChange={this.handleChange}/>
				<input className="answer" type="text" className="form-control" ref="answerText" onChange={this.handleChange}/>
			</div>
		)
	}

}

export default QuestionInput;