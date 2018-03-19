import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegistrationBox extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.register = this.register.bind(this);
	}

	handleEmail(e) {
		this.setState({email: e.target.value});
	}

	handlePassword(e) {
		this.setState({password: e.target.value});
	}

	register(e) {
		e.preventDefault();
		axios.post('/users', {
			email: this.state.email,
			password: this.state.password
		}).then((res) => {
			console.log(res.data);
			this.props.history.push("/quizzes");
		}).catch((e) => console.log(e));
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="container mb-3">
				<div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3">
					<h3>Resigter</h3>
					<form action="" className="mb-3">
						<div className="form-group">
							<label htmlFor="email-input">Email Address</label>
							<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmail}/>
						</div>
						<div className="form-group">
							<label htmlFor="password-input">Password</label>
							<input type="password" className="form-control" id="password-input" aria-describedby="passwordHelp" placeholder="password" onChange={this.handlePassword}/>
						</div>
						<button type="submit" className="btn btn-primary" onClick={this.register}>Register</button>
					</form>
				</div>
				<Link to="/login" className="text-center d-block">Already a user? Login here</Link>
			</div>
		)
	}
}

export default RegistrationBox;