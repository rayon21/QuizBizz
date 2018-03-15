import React, { Component } from 'react';

class QuizPage extends Component {
	render() {
		return (
			<div className="container">
				<h1>Chapter 1</h1>
				<div className="row">
					<div className="col">
						<button className="btn btn-primary">Play Now</button>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between">
									<p className="">Question 1: What is criminology?</p>
									<button className="btn btn-primary">Edit</button>
								</div>
							</div>
							<div className="d-flex flex-wrap mb-4">
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">A: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">B: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">C: Hello</button>
									</div>
									<div className="col-sm-6">
										<button className="btn btn-primary col-sm-12 mt-3">D: Hello</button>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default QuizPage;