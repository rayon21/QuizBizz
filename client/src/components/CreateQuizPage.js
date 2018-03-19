import React, { Component } from 'react';
import axios from 'axios';

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
		const token = localStorage.getItem('token');
		axios.post('/api/quizzes', {
			title: this.state.title,
			description: this.state.description
		}, {headers: {
			'x-auth': token
		}}).then((res) => {
			this.props.history.push("/quiz/" + res.data._id);
		});
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
				<button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
			</div>
		)
	}
}

export default CreateQuizPage;