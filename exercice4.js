// Retrieve mongodb connector
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/inf4375_s05", function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
		throw err;
	}
	console.log("Connected");

	// Get the collection
	db.collection('produits', function(err, collection) {
		if(err) {
			console.log("Cannot get the collection!");
			throw err;
		}
		collection.remove({fabriquant: "Apple"}, {w:1}, function(err, result) {
			// print number of deleted documents (since w:1 option is on)
			console.log(result);
			// don't forget to close the connexion after use!
			db.close();
		});
	});
});
