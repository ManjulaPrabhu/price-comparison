import React from 'react';
import '../css/input-control.css';
const InputControls = ({ searchKey, onInputSearch, onSearch }) => {
	return (
		<div className="input-section">
			<label className="section-label">
				{' '}
				Compare Prices for
				<input
					className="search-input"
					type="text"
					value={searchKey}
					onChange={onInputSearch}
					onKeyUp={e => {
						if (e.key === 'Enter') {
							onSearch();
						}
					}}
				/>{' '}
				<button onClick={onSearch} disabled={!searchKey}>
					{' '}
					Compare{' '}
				</button>
			</label>
		</div>
	);
};
export default InputControls;
