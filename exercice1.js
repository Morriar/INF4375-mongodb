// Retrieve mongodb connector
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/inf4375_s05", function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
	}
	console.log("Connected");
	// don't forget to close the connexion after use!
	db.close();
});
