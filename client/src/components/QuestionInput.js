import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuestionInput extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: ''
		}
	}

	handleChange(e) {
		this.setState({value: e.target.value});
		this.props.updateQuestion(this.props.number - 1, e.target.value);
		console.log(e.target.value);
	}

	didComponentMount() {
		this.setState({value: this.props.question});
	}

	render() {
		return (
			<div className="form-group">
				<label htmlFor="">{this.props.number}</label>
				<input type="text" className="form-control"  onChange={this.handleChange} value={this.state.value}/>
			</div>
		)
	}

}

export default QuestionInput;