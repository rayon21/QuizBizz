import React, { Component } from 'react';
import RegistrationBox from './RegistrationBox.js';
import Header from './Header.js';

class RegistrationPage extends Component {
	render() {
		return (
			<div>
				<Header/>
				<RegistrationBox/>
			</div>
		)
	}
}

export default RegistrationPage;