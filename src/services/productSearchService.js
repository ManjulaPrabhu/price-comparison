export const sendSignUpRequest = ({ username }) => {
	return fetch('/signUp', {
		method: 'POST',
		body: JSON.stringify({ username }),
		headers: new Headers({ 'content-type': 'application/json' })
	}).then(
		response => (response.ok ? response.json() : Promise.reject('login-fail'))
	);
};

export const sendLogInRequest = ({ username }) => {
	return fetch('/login', {
		method: 'POST',
		body: JSON.stringify({ username }),
		headers: new Headers({ 'content-type': 'application/json' })
	}).then(
		response => (response.ok ? response.json() : Promise.reject('login-fail'))
	);
};

export const sendSearchRequest = searchKey => {
	return fetch('/products?productName=' + searchKey).then(
		response =>
			response.ok ? response.json() : Promise.reject('send-search-fail')
	);
};

export const retrieveWishList = ({ username }) => {
	return fetch('/wishList?userName=' + username).then(
		response =>
			response.ok ? response.json() : Promise.reject('send-search-fail')
	);
};

export const updateWishListDetails = ({ username, itemID, actionToBeDone }) => {
	return fetch('/wishList', {
		method: 'POST',
		body: JSON.stringify({ username, itemID, actionToBeDone }),
		headers: new Headers({ 'content-type': 'application/json' })
	}).then(
		response => (response.ok ? response.json() : Promise.reject('login-fail'))
	);
};
