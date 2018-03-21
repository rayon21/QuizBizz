import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginBox extends Component {
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

	saveToken(value) {
		localStorage.setItem('token', value);
	}

	register(e) {
		e.preventDefault();
		axios.post('/users/login', {
			email: this.state.email,
			password: this.state.password
		}).then((res) => {
			console.log(res.headers['x-auth']);
			if (res.status == 200) {
				this.saveToken(res.headers['x-auth']);
				this.props.history.push("/quizzes/");
			}
		});
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="container mb-3">
				<div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3">
					<h3>Login</h3>
					<form action="" className="mb-3">
						<div className="form-group">
							<label htmlFor="email-input">Email Address</label>
							<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmail}/>
						</div>
						<div className="form-group">
							<label htmlFor="password-input">Password</label>
							<input type="password" className="form-control" id="password-input" aria-describedby="passwordHelp" placeholder="password" onChange={this.handlePassword}/>
						</div>
						<button type="submit" className="btn btn-primary" onClick={this.register}>Login</button>
					</form>
				</div>
			</div>
		)
	}
}

export default LoginBox;

