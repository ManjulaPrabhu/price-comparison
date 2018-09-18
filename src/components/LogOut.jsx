import React from 'react';
import '../css/input-control.css';
const LogOut = ({ currentUser, logOutUser, showWishList }) => {
	return (
		<div className="logout-box">
			<div className="section-label"> Hi! {currentUser} </div>
			<button className="logOut" onClick={logOutUser}>
				Logout
			</button>
			<button onClick={showWishList}>My Wishlist</button>
		</div>
	);
};
export default LogOut;
