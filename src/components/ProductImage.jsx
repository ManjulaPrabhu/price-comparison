import React from 'react';
import '../css/products-listing.css';
const ProductImage = ({ imageToDisplay, productName }) => {
	return (
		<div>
			<div className="product-name">{productName.toUpperCase()}</div>
			<img src={imageToDisplay} className="product-image" alt="product" />{' '}
		</div>
	);
};
export default ProductImage;
