import React, { Component } from 'react';
import RegistrationBox from './RegistrationBox.js';
import Header from './Header.js';

class RegistrationPage extends Component {
	render() {
		return (
			<div>
				<Header/>
				<div className="">
					<div className="row">
						<div className="col-md-7 info-section"></div>
						<div className="col-md-5 reg-section pt-5">
							<RegistrationBox history={this.props.history}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RegistrationPage;