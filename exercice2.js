// Retrieve mongodb connector
var MongoClient = require('mongodb').MongoClient;

var p1 = {
	nom: "Macbook Pro",
	fabriquant: "Apple",
	prix: 1299,
	options: ["Intel Core i5", "Retina Display", "Long life battery"]
};

var p2 = {
	nom: "Macbook Pro Air",
	fabriquant: "Apple",
	prix: 1099.99,
	options: ["Intel Core i7", "SSD", "Long life battery"]
};

var p3 = {
	nom: "Thinkpad X230",
	fabriquant: "Lenovo",
	prix: 999.99,
	"ultrabook": true,
	options: ['Intel Core i5', 'SSD', 'Long life battery']
};

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/inf4375_s05", function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
		throw err;
	}
	console.log("Connected");

	// Create the collection
	db.collection('produits', function(err, collection) {
		if(err) {
			console.log("Cannot create the collection!");
			throw err;
		}
		console.log("Collection created");
		collection.insert([p1, p2, p3], {w: 1}, function(err, doc){
			if(err) {
				console.log("Cannot add product in that collection!");
				throw err;
			}
			console.log("Products inserted");
			// don't forget to close the connexion after use!
			db.close();
		});
	});
});
