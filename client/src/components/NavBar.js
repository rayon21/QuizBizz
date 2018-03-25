import React, { Component } from 'react';
import axios from 'axios';

class NavBar extends Component {

	logout = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		console.log(token);
		axios.delete('/users/logout', {
			headers: {
				"x-auth": token
			}
		}).then((res) => {
			console.log(res.data);
			alert("you have been logged out TODO redirect");
		})
	}
	
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-primarytwo">
			  <a className="navbar-brand" href="/">
			  	<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 326.3 66.9" preserveAspectRatio="true" className="logo-navbar"> <g id="XMLID_1_"> <path id="XMLID_6_" d="M99,45.1c0,13.6-8.2,19.4-21.2,19.4c-4.8,0-11.8-1.2-16.4-6.3c-2.8-3.2-3.9-7.3-4-12.5V11.5h11V45 c0,7.2,4.2,10.4,9.2,10.4c7.4,0,10.4-3.6,10.4-9.9V11.5h11V45.1z"/> <path id="XMLID_8_" d="M119.5,63.2h-10.8V26h10.8V63.2z"/> <path id="XMLID_10_" d="M166.3,63.2h-40.4V54l26.7-33.4h-26v-9.1h39.5V20L139.1,54h27.2V63.2z"/> <path id="XMLID_12_" d="M173.6,11.5h25.1c12.7,0,15.9,7.9,15.9,13.2c0,7.4-4.2,9.5-6.3,10.6c6.3,2.4,8,7.4,8,12.5 c0,4.1-1.7,8-4.5,10.7c-3,2.9-5.8,4.7-16.3,4.7h-21.9V11.5z M184,31.7h12.7c4.2,0,7.6-1.7,7.6-5.8c0-4.2-3-5.5-7.9-5.5H184V31.7z M184,54.2h13.2c5.3,0,8.3-2.3,8.3-7.6c0-4.5-3.9-6.3-7.8-6.3H184V54.2z"/> <path id="XMLID_18_" d="M282.3,63.2h-40.4V54l26.7-33.4h-26v-9.1h39.5V20L255.1,54h27.2V63.2z"/> <path id="XMLID_20_" d="M326.3,63.2h-40.4V54l26.7-33.4h-26v-9.1h39.5V20L299.1,54h27.2V63.2z"/> <polygon id="copyq" points="31,43.3 25.5,49.1 44.2,66.9 49.9,61.1 "/> <path id="XMLID_22_" d="M25.6,55.4c-0.2,0-0.5,0-0.7,0c-5.8,0-14-3.6-14-18.1s8.2-18.1,14-18.1s14,3.6,14,18.1 c0,2.5-0.3,4.7-0.7,6.6l8.5,8c1.8-3.7,3-8.5,3-14.6c0-24.3-18-27.2-24.8-27.2C18,10.1,0,13.1,0,37.3s18,27.2,24.8,27.2 c2.1,0,5.4-0.3,8.8-1.5L25.6,55.4z"/> <rect id="XMLID_2_" x="15.7" y="0" width="19.1" height="6.3"/> <rect id="XMLID_3_" x="22.3" y="3.4" width="6.3" height="13.4"/> <circle id="XMLID_4_" cx="114.2" cy="16.8" r="5.5"/> <path id="XMLID_16_" d="M234.8,63.3H224V26.1h10.8V63.3z"/> <circle id="XMLID_5_" cx="229.5" cy="16.9" r="5.5"/> </g> </svg>
			  </a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav ml-auto">
			      <li className="nav-item active">
			        <a className="nav-link text-white" href="/">Home<span className="sr-only">(current)</span></a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link text-white" href="/quizzes">My Quizzes</a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link text-white" href="/logout" onClick={this.logout}>Logout</a>
			      </li>
			    </ul>
			  </div>
			</nav>
		)
	}
}

export default NavBar;