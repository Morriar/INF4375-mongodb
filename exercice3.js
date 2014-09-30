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
		// Find and display all documents in the collection.
		collection.find().toArray(function(err, items) {
			console.log(items);

			// Find the first document
			collection.findOne({}, function(err, item){
				console.log(item);

				// More complex query examples

				collection.find({prix: {$gt: 1200}}).toArray(function(err, items) {
					console.log(items);

					collection.findOne({ultrabook: true}, function(err, item) {
						console.log(item);

						collection.findOne({nom: /Macbook/}, function(err, item) {
							console.log(item);

							collection.find({nom: /^Macbook/}).toArray(function(err, items) {
								console.log(items);
								// don't forget to close the connexion after use!
								db.close();
							});
						});
					});
				});
			});	
		});
	});
});
