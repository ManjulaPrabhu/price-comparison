import React from 'react';
import '../css/input-control.css';
const SignUp = ({ currentUser, onUpdateUsername, signUpUser }) => {
	return (
		<div className="application-entry-section">
			<div className="section-heading"> Sign Up with a user key</div>
			<input
				className="username-box"
				onChange={onUpdateUsername}
				placeholder="Username"
			/>
			<button
				className="application-entry-submit"
				onClick={signUpUser}
				disabled={!currentUser}>
				Sign Up
			</button>
		</div>
	);
};
export default SignUp;
