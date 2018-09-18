import React, { Component } from 'react';
import StatusMessage from './components/StatusMessage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import InputControls from './components/InputControls';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import ProductImage from './components/ProductImage';
import NoResults from './components/NoResults';
import Modal from 'react-modal';
import {
	sendSignUpRequest,
	sendLogInRequest,
	sendSearchRequest,
	updateWishListDetails,
	retrieveWishList
} from './services/productSearchService';
import './css/App.css';
import * as homePageImage from './assets/home_page_img.jpg';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		height: '300px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		overflowy: 'scroll'
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKey: '',
			status: '',
			resultItems: [],
			imageToDisplay: '',
			homePageImage: homePageImage,
			noResultsStatus: false,
			productName: '',
			logInStatus: false,
			wishList: [],
			modalIsOpen: false,
			searchResultFlag: false
		};
		this.signUpUser = this.signUpUser.bind(this);
		this.updateSignUpStatus = this.updateSignUpStatus.bind(this);
		this.onUpdateUsername = this.onUpdateUsername.bind(this);
		this.logInUser = this.logInUser.bind(this);
		this.logOutUser = this.logOutUser.bind(this);
		this.updateLogInStatus = this.updateLogInStatus.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onInputSearch = this.onInputSearch.bind(this);
		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.addToWishList = this.addToWishList.bind(this);
		this.updateWishListStatus = this.updateWishListStatus.bind(this);
		this.updateWishList = this.updateWishList.bind(this);
		this.showWishList = this.showWishList.bind(this);
		this.removeFromWishList = this.removeFromWishList.bind(this);

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	signUpUser() {
		const username = this.state.currentUser;
		sendSignUpRequest({ username }).then(this.updateSignUpStatus);
	}

	updateSignUpStatus(signUpStatus) {
		if (signUpStatus === 'true') {
			this.setState({ logInStatus: true, status: 'Signed Up Successfully!' });
		} else {
			this.setState({
				logInStatus: false,
				status: 'Signing up was unsuccessfull!'
			});
		}
	}

	onUpdateUsername(e) {
		const username = e.target.value;
		this.setState({
			currentUser: username
		});
	}

	logInUser() {
		const username = this.state.currentUser;
		sendLogInRequest({ username }).then(this.updateLogInStatus);
	}
	updateLogInStatus(logInStatus) {
		if (logInStatus.length > 0) {
			this.setState({ logInStatus: true, status: 'Logged In!' });
		} else {
			this.setState({
				logInStatus: false,
				status: 'Log In was unsuccessfull!'
			});
		}
	}

	logOutUser() {
		this.setState({ logInStatus: false, searchKey: '', resultItems: [] });
		console.log(this.state.logInStatus);
	}
	onInputSearch(e) {
		this.setState({ searchKey: e.target.value });
	}
	onSearch() {
		let searchToBeSent = this.state.searchKey;
		sendSearchRequest(searchToBeSent)
			.then(this.updateSearchResults)
			.catch(err => this.setState({ status: 'Error, fetching products' }));
	}
	updateSearchResults(results) {
		if (results.length === 0) {
			this.setState({
				noResultsStatus: true,
				resultItems: results
			});
		} else {
			this.setState({
				noResultsStatus: false,
				searchResultFlag: true,
				resultItems: results,
				imageToDisplay: results[0].picture,
				productName: results[0].productName
			});
		}
		this.setState({ searchKey: '' });
	}

	addToWishList(e) {
		let actionToBeDone = 'add';
		const username = this.state.currentUser;
		const itemID = e.target.id;
		updateWishListDetails({ username, itemID, actionToBeDone }).then(
			this.updateWishListStatus
		);
	}

	updateWishListStatus(wishListStatus) {
		if (wishListStatus) {
			this.setState({ status: 'Wishlist updation is successful' });
		} else {
			this.setState({
				status: 'Wishlist updation is unsuccessful, Please try again'
			});
		}
	}

	showWishList() {
		let username = this.state.currentUser;
		retrieveWishList({ username }).then(this.updateWishList);
	}

	updateWishList(retrievedWishList) {
		this.setState({ wishList: retrievedWishList });
		if (this.state.wishList.length > 0) {
			this.setState({ modalIsOpen: true, status: '' });
		} else if (this.state.wishList.length === 0) {
			this.setState({ status: 'Wish list is empty' });
		}
	}

	removeFromWishList(e) {
		let actionToBeDone = 'remove';
		const username = this.state.currentUser;
		const itemID = e.target.id;
		updateWishListDetails({ username, itemID, actionToBeDone }).then(
			this.updateWishListStatus
		);
		this.closeModal();
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}
	closeModal() {
		this.setState({ modalIsOpen: false, searchResultFlag: true });
	}

	afterOpenModal() {
		this.setState({ searchResultFlag: false });
	}

	render() {
		return (
			<div className="App">
				{this.state.logInStatus ? (
					<div>
						<LogOut
							currentUser={this.state.currentUser}
							logOutUser={this.logOutUser}
							showWishList={this.showWishList}
						/>
						<StatusMessage status={this.state.status} />
						<InputControls
							searchKey={this.state.searchKey}
							onInputSearch={this.onInputSearch}
							onSearch={this.onSearch}
						/>
					</div>
				) : (
					<div>
						<StatusMessage status={this.state.status} />
						<HomePage homePageImage={this.state.homePageImage} />
						<SignUp
							currentUser={this.state.currentUser}
							onUpdateUsername={this.onUpdateUsername}
							signUpUser={this.signUpUser}
						/>
						<LogIn
							currentUser={this.state.currentUser}
							onUpdateUsername={this.onUpdateUsername}
							logInUser={this.logInUser}
						/>
					</div>
				)}
				{this.state.logInStatus && this.state.resultItems.length > 0 ? (
					<div>
						<div className="search-results-section">
							<ProductImage
								imageToDisplay={this.state.imageToDisplay}
								productName={this.state.productName}
							/>
							<SearchResults
								searchResultFlag={this.state.searchResultFlag}
								resultItems={this.state.resultItems}
								addToWishList={this.addToWishList}
								getWishListDetails={this.getWishListDetails}
								removeFromWishList={this.removeFromWishList}
							/>{' '}
						</div>
					</div>
				) : null}
				{this.state.noResultsStatus ? <NoResults /> : null}
				{this.state.wishList.length > 0 ? (
					<div>
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={customStyles}>
							<b> Your Wishlist </b>
							<StatusMessage status={this.state.status} />
							<SearchResults
								searchResultFlag={this.state.searchResultFlag}
								resultItems={this.state.wishList}
								addToWishList={this.addToWishList}
								getWishListDetails={this.getWishListDetails}
								removeFromWishList={this.removeFromWishList}
							/>
						</Modal>
					</div>
				) : null}
			</div>
		);
	}
}

export default App;
