import React, {Component} from 'react';

class HeaderGuest extends Component {
	render() {
		return (
			<nav>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<a href="#" class="nav-link">Sign Up</a>
					</li>
					<li className="nav-item">
						<a href="#" class="nav-link">Login</a>
					</li>
				</ul>
			</nav>
		)
	}
}

export default HeaderGuest;