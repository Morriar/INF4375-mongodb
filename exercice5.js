// Retrieve mongodb connector
var MongoClient = require('mongodb').MongoClient;

var f1 = {
	"numero_facture" : "10012A",
	"date" : new Date("Jul 4, 2013"),
	"client" : {
		"nom" : "Alexandre Terrasa",
		"email" : "foobar@example.com"
	},
	"produits" : [
		{
			"code" : "MACBOOKAIR",
			"nom" : "Macbook Air",
			"prix" : 999.99,
			"quantite" : 1
		},
		{
			"code" : "APPLESUPPORT",
			"nom" : "AppleCare 1 an",
			"prix" : 149.99,
			"quantite" : 1
		}
	],
	"total" : 1149.98
};

var f2 = {
	"numero_facture" : "10013A",
	"date" : new Date("Jul 5, 2013"),
	"numero_facture" : "10013A",
	"client" : {
		"nom" : "Jacques Berger",
		"email" : "berger.jacques@uqam.ca"
	},
	"produits" : [
		{
			"code" : "LENOVOX230",
			"nom" : "Lenovo Thinkpad X230",
			"prix" : 899.99,
			"quantite" : 1
		},
	],
	"total" : 899.99
};

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/inf4375_s05", function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
		throw err;
	}
	console.log("Connected");

	// Get the collection
	db.collection('factures', function(err, collection) {
		if(err) {
			console.log("Cannot get the collection!");
			throw err;
		}
		// Insert factures
		collection.insert([f1, f2], {w: 1}, function(err, docs){
			if(err) {
				console.log("Cannot add factures in that collection!");
				throw err;
			}
			// Get facture with # 10013A
			collection.findOne({numero_facture: "10013A"}, function(err, item) {
				console.log(item);

				// Update facture 10012A
				collection.update({numero_facture: "10012A"}, {$set:{"client.email": "alex@example.com"}}, {w:1}, function(err, result) {
					console.log(result);

					// Get facture with product LENOVOX230
					collection.findOne({produits: {$elemMatch: {'code': "LENOVOX230"}}}, function(err, item) {
						console.log(item);

						// Delete facture 10012A
						collection.remove({numero_facture: "10012A"}, {w:1}, function(err, result) {
							console.log(result);
							// don't forget to close the connexion after use!
							db.close();
						});
					});
				});
			});
		});
	});
});
