import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegistrationBox extends Component {
	constructor() {
		super();
		this.state = {
			email: null,
			password: null,
			test: "fuck"
		}
	}

	login() {
		axios.get('/api/3').then((res) => console.log(res.data));
	}

	componentDidMount() {
		this.login();
	}

	render() {
		return (
			<div className="container mb-3">
				<div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3">
					<form action="" className="mb-3">
						<div className="form-group">
							<label htmlFor="email-input">Email Address</label>
							<input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email"/>
						</div>
						<div className="form-group">
							<label htmlFor="password-input">Password</label>
							<input type="password" className="form-control" id="password-input" aria-describedby="passwordHelp" placeholder="password"/>
						</div>
						<button type="submit" className="btn btn-primary">Register</button>
					</form>
				</div>
				<Link to="/login" className="text-center d-block">Already a user? Login here</Link>
				<p>{this.state.test}</p>
			</div>
		)
	}
}

export default RegistrationBox;