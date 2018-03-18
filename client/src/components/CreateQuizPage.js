import React, { Component } from 'react';

class CreateQuizPage extends Component {

	constructor() {
		super();
		this.state = {
			title: '',
			description: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleSubmit(e) {
		return
	}

	handleInput(e) {
		this.setState({[e.target.name]: e.target.value});
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
				<button className="btn btn-primary">Create</button>
			</div>
		)
	}
}

export default CreateQuizPage;