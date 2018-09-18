import React from 'react';
import '../css/App.css';
const HomePage = ({ homePageImage }) => {
	return (
		<div className="home-page-img">
			<img src={homePageImage} alt="home page" />{' '}
		</div>
	);
};
export default HomePage;
