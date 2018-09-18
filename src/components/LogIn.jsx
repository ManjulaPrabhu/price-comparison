import React from 'react';
import '../css/input-control.css';
const LogIn = ({ currentUser, onUpdateUsername, logInUser }) => {
	return (
		<div className="application-entry-section">
			<div className="section-heading"> Already registered? Log In! </div>
			<input
				className="username-box"
				onChange={onUpdateUsername}
				placeholder="Username"
			/>
			<button
				className="application-entry-submit"
				onClick={logInUser}
				disabled={!currentUser}>
				Log In
			</button>
		</div>
	);
};

export default LogIn;
