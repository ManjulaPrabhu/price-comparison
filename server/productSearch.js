const MongoClient = require('mongodb').MongoClient;
const MONGO_URL =
	'mongodb://manjula:Preethi24@ds051943.mlab.com:51943/product-prices';
let dbObject = {};
let fetchedProducts = [];
let collectionObject = '';
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
		collectionObject = dbObject.collection('store1');
	}
);

let activeUsers = [];

const addUser = user => {
	if (!activeUsers.includes(user)) {
		activeUsers.push(user);
	}
};

const fetchProducts = searchKey => {
	collectionObject
		.find({ productName: searchKey })
		.toArray(function(err, result) {
			if (err) throw err;
		});
};
module.exports = {
	addUser,
	fetchProducts
};
