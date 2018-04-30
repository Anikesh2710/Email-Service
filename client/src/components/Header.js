import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StripeComponent from './StripeComponent';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li><a href="/auth/google">Login with Google</a></li>
				);
			default:
				return [	
					<li key="stripe-component"><StripeComponent /></li>,
					<li key="credits" style={{margin: '0 10px'}}> Credits: { this.props.auth.credits } </li>,
					<li key="login"><a href="/api/logout">Log out</a></li>
				]
		}
	}

	render () {
		return (
			  <nav>
			    <div className="nav-wrapper">
			      <Link 
			      		to={this.props.auth ? '/surveys' : '/'} 
			      		className="brand-logo"
			      >
			      	Emailey
			      </Link>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        {this.renderContent()}
			      </ul>
			    </div>
			  </nav>
			)
	}
}

// function mapStateToProps(state) {
// 	return { auth: state.auth}
// }
//  -------- SAME --------
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);