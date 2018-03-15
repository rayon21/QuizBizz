import React, { Component } from 'react';

class CreateQuizPage extends Component {
	render() {
		return (
			<div className="container mt-5">
				<div className="form-group">
					<label htmlFor="name">Name: </label>
					<input type="text" className="form-control" id="name"/>
				</div>
				<div className="form-group">
					<label htmlFor="name">Description: </label>
					<input type="text" className="form-control" id="description"/>
				</div>
				<button className="btn btn-primary">Create</button>
			</div>
		)
	}
}

export default CreateQuizPage;