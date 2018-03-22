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
				<div className="col-sm-4 offset-sm-4 pb-3 pt-4 mb-3 reg-container">
					<h4 className="mt-4 mb-4">Join with your email</h4>
					<form action="" className="mb-3">
						<div className="form-group">
							<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="email" onChange={this.handleEmail}/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" id="password-input" aria-describedby="passwordHelp" placeholder="password" onChange={this.handlePassword}/>
						</div>
						<div className="row d-flex justify-content-end mr-2 ml-2 mt-4">
							<button type="submit" className="btn btn-primary" onClick={this.register}>register</button>
						</div>
					</form>
				</div>
				<Link to="/login" className="text-center d-block text-white">Already a user? Login here</Link>
			</div>
		)
	}
}

export default RegistrationBox;