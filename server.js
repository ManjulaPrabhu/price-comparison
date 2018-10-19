const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(express.static('./public'));

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL =
	'mongodb://manjula:Preethi24@ds051943.mlab.com:51943/product-prices';
let dbObject = {};
let fetchedProducts = [];
let collectionObject = '';
let userCollectionObject = '';
let ObjectId = require('mongodb').ObjectID;
MongoClient.connect(
	MONGO_URL,
	(err, client) => {
		if (err) {
			return console.log(err);
		} else {
			console.log('connected');
		}
		const db = client.db('product-prices');
		dbObject = db;
		userCollectionObject = dbObject.collection('user-details');
		collectionObject = dbObject.collection('store1');
	}
);

app.post('/signUp', bodyParser.json(), (request, response) => {
	userCollectionObject
		.find({
			username: request.body.username
		})
		.toArray(function(err, result) {
			if (err) throw err;
			if (result.length === 0) {
				let documentObjectToBeInserted = {
					username: request.body.username,
					wishList: []
				};
				userCollectionObject.insertOne(documentObjectToBeInserted, function(
					err,
					res
				) {
					if (err) throw err;
					console.log('1 document inserted');
					response.send(JSON.stringify('true'));
				});
			} else {
				response.send(JSON.stringify('false'));
			}
		});
});

app.post('/login', bodyParser.json(), (request, response) => {
	userCollectionObject
		.find({
			username: request.body.username
		})
		.toArray(function(err, result) {
			if (err) throw err;
			response.send(JSON.stringify(result));
		});
});

app.post('/wishList', bodyParser.json(), (request, response) => {
	const usernameToSearch = request.body.username;
	const itemIDToSearch = request.body.itemID;

	if (request.body.actionToBeDone === 'add') {
		addItemToWishList(response, usernameToSearch, itemIDToSearch);
	} else if (request.body.actionToBeDone === 'remove') {
		removeItemFromWishList(response, usernameToSearch, itemIDToSearch);
	}
});

function addItemToWishList(response, usernameToSearch, itemIDToSearch) {
	let promise = [];
	promise.push(addItemToDataBase(usernameToSearch, itemIDToSearch));
	Promise.all(promise).then(function(result) {
		response.send(JSON.stringify(result));
	});
}

function addItemToDataBase(usernameToSearch, itemIDToSearch) {
	return new Promise((resolve, reject) => {
		userCollectionObject
			.find({
				username: usernameToSearch
			})
			.toArray(function(err, result) {
				if (err) throw err;
				if (!result[0].wishList.includes(itemIDToSearch)) {
					result[0].wishList.push(itemIDToSearch);
					let updateQuery = { username: usernameToSearch };
					let updateValues = { $set: { wishList: result[0].wishList } };
					userCollectionObject.update(updateQuery, updateValues, function(
						err,
						res
					) {
						if (err) reject(err);
						else resolve(true);
					});
				} else {
					if (err) reject(err);
					resolve(false);
				}
			});
	});
}

function removeItemFromWishList(response, usernameToSearch, itemIDToSearch) {
	let promise = [];
	promise.push(removeItemFromDataBase(usernameToSearch, itemIDToSearch));
	Promise.all(promise).then(function(result) {
		response.send(JSON.stringify(result));
	});
}

function removeItemFromDataBase(usernameToSearch, itemIDToSearch) {
	return new Promise((resolve, reject) => {
		userCollectionObject
			.find({
				username: usernameToSearch
			})
			.toArray(function(err, result) {
				if (err) throw err;
				result[0].wishList.splice(
					result[0].wishList.indexOf(itemIDToSearch),
					1
				);
				let updateQuery = { username: usernameToSearch };
				let updateValues = { $set: { wishList: result[0].wishList } };
				userCollectionObject.update(updateQuery, updateValues, function(
					err,
					res
				) {
					if (err) reject(err);
					else resolve(true);
				});
			});
	});
}

app.get('/wishList', (request, response) => {
	let wishListResults = [];
	let promises = [];
	let item = [];
	userCollectionObject
		.find({
			username: request.query.userName
		})
		.toArray(function(err, result) {
			if (err) throw err;
			let itemsToBeRetrieved = result[0].wishList;
			for (let index = 0; index < itemsToBeRetrieved.length; index++) {
				let uId = ObjectId(itemsToBeRetrieved[index]);
				promises.push(getProductItem(uId));
			}
			//------
			Promise.all(promises).then(function(result) {
				for (let resultIndex = 0; resultIndex < result.length; resultIndex++) {
					wishListResults.push({
						productName: result[resultIndex].productName,
						picture: result[resultIndex].picture,
						price: result[resultIndex].price,
						storeName: result[resultIndex].storeName,
						storeLink: result[resultIndex].storeLink
					});
				}
				response.send(JSON.stringify(wishListResults));
			});
		});
});

function getProductItem(uId) {
	return new Promise((resolve, reject) => {
		collectionObject.findOne({ _id: uId }, function(err, wishListRecord) {
			if (err) {
				reject(err);
			} else {
				resolve(wishListRecord);
			}
		});
	});
}

app.get('/products', (request, response) => {
	collectionObject
		.find({
			productName: request.query.productName.toLowerCase()
		})
		.toArray(function(err, result) {
			if (err) throw err;
			response.send(JSON.stringify(result));
		});
});
app.listen(process.env.PORT || PORT, () =>
	console.log(`listening on http://localhost:${PORT}`)
);
