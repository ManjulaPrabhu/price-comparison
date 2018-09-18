import React from 'react';
import Result from '../components/Result';
import '../css/products-listing.css';
const SearchResults = ({
	resultItems,
	addToWishList,
	getWishListDetails,
	searchResultFlag,
	removeFromWishList
}) => {
	let lowestPrice = resultItems[0].price;
	let lowestPriceStore = resultItems[0].storeName;
	for (let loopIndex = 1; loopIndex < resultItems.length; loopIndex++) {
		if (resultItems[loopIndex].price < lowestPrice) {
			lowestPrice = parseFloat(resultItems[loopIndex].price);
			lowestPriceStore = resultItems[loopIndex].storeName;
		}
	}
	const allResults = resultItems.map((item, index) => (
		<li className="search-result-list" key={index}>
			<Result
				searchResultFlag={searchResultFlag}
				item={item}
				lowestPriceStore={lowestPriceStore}
				addToWishList={addToWishList}
				getWishListDetails={getWishListDetails}
				removeFromWishList={removeFromWishList}
			/>
		</li>
	));
	return (
		<div className="compare-results-section">
			<ul className="products-list"> {allResults} </ul>
		</div>
	);
};
export default SearchResults;
