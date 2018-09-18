import React from 'react';
import '../css/products-listing.css';
import * as amazonIcon from '../assets/amazon-logo.jpg';
import * as walmartIcon from '../assets/walmart-logo.jpg';
import * as targetIcon from '../assets/target-logo.jpg';
import * as greatDealIcon from '../assets/great-deal-logo.jpg';

const Result = ({
	item,
	lowestPriceStore,
	addToWishList,
	getWishListDetails,
	searchResultFlag,
	removeFromWishList
}) => {
	if (item.storeName !== lowestPriceStore) {
		lowestPriceStore = '';
	} else {
		lowestPriceStore = 'Great Deal!!';
	}
	let storeIcon = '';
	if (item.storeName === 'amazon') {
		storeIcon = amazonIcon;
	} else if (item.storeName === 'walmart') {
		storeIcon = walmartIcon;
	} else if (item.storeName === 'target') {
		storeIcon = targetIcon;
	}

	return (
		<div className="result-item">
			<div className="store-name">
				<img className="store-logo" src={storeIcon} alt="store-icon" />
			</div>
			<div className="product-price"> ${item.price}</div>
			<div className="product-buy">
				<a className="product-buy-link" href={item.storeLink} target="_blank">
					Buy Now!{' '}
				</a>
			</div>
			{lowestPriceStore !== '' ? (
				<img className="deal-logo" src={greatDealIcon} alt="deal" />
			) : (
				<div> </div>
			)}
			{searchResultFlag ? (
				<div>
					<button
						id={item._id}
						className="wish-list-operation"
						onClick={addToWishList}>
						{' '}
						Add to Wishlist
					</button>
				</div>
			) : (
				<div>
					<button
						id={item._id}
						className="wish-list-operation"
						onClick={removeFromWishList}>
						{' '}
						Remove
					</button>
				</div>
			)}
			{!searchResultFlag ? (
				<div className="product-name"> {item.productName.toUpperCase()} </div>
			) : (
				''
			)}
		</div>
	);
};
export default Result;
