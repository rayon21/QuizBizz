import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class LoginBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		this.register = this.register.bind(this);
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		})
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
			<div className="container mb-3 mt-5">
				<div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3 reg-container">
					<h3>Login</h3>
					<form action="" className="mb-3">
						<TextField
					      fullWidth
					      type="email"
					      label="Email"
					      margin="normal"
					      onChange={this.handleChange('email')}
					    />
					    <TextField
					      fullWidth
					      label="Password"
					      type="password"
					      margin="normal"
					      onChange={this.handleChange('password')}
					    />
						<button type="submit" className="btn btn-primary mt-4" onClick={this.register}>Login</button>
					</form>
				</div>
			</div>
		)
	}
}

export default LoginBox;

