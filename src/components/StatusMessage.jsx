import React from 'react';
import '../css/App.css';
const StatusMessage = ({ status }) => {
	return <div className="status-message"> {status} </div>;
};
export default StatusMessage;
