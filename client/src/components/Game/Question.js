import React, { Component } from 'react';

class Question extends Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="question-container">
				<h1>
					{this.props.question}
				</h1>
			</div>
		)
	}
}

export default Question;