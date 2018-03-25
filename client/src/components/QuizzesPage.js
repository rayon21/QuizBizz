import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import NavBar from './NavBar.js'

class QuizzesPage extends Component {

	constructor() {
		super();
		this.state = {
			quizzes: []
		}
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		axios.get('/api/quizzes/', {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			this.setState({quizzes: res.data.quizzes});
		});
	}

	renderQuizzes() {
		return this.state.quizzes.map((quiz) => {
			const url = "/quiz/" + quiz._id;
			return (
				<div key={quiz._id} className="mb-2">
			      <Card key={quiz._id}>
			        <CardContent key={quiz._id}>
			          <Link to={url}>
				          <Typography variant="headline" component="h2">
				            {quiz.title}
				          </Typography>
				      </Link>
			          <Typography color="textSecondary">
			            {quiz.description}
			          </Typography>
			          	<button className="btn btn-primary mt-3">start</button>
			        </CardContent>
			      </Card>
    			</div>
			)
		});
	}

	render() {
		return [
			<NavBar/>,
			<div className="container mt-5">
				<h1>My Quizzes</h1>
				<div className="d-flex justify-content-end">
					<Link to="/create"><button className="btn btn-primary">Create new quiz</button></Link>
				</div>
				<div className="mt-3">
					{this.renderQuizzes()}
				</div>
			</div>
		];
	}
}

export default QuizzesPage;