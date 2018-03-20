import React, { Component } from 'react';

class PresenterPage extends Component {
	render() {
		return (
			<div className="container">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">ROOM CODE: DCDK</h5>
					</div>
				</div>

				<ul class="list-group">
				  <li class="list-group-item">Jane Doe</li>
				  <li class="list-group-item">Parmis</li>
				  <li class="list-group-item">Richard</li>
				</ul>
				<button className="btn btn-primary mt-3">Start</button>
			</div>
		)
	}
}

 export default PresenterPage;