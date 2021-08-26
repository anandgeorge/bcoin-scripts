const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';

MongoClient.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const app = express()

	app.get('/getrawtransaction/:txhash', function (req, res) {
		(async () => {
			const res = await db.collection('transactions').findOne({_id:req.params.txhash});
			if(res) {
				res.json(rpcres);
			}
			else {
				res.json({status:'Sorry we could not find that transaction'});
			}
		})().catch((err) => {
	  		console.error(err.stack);
			res.json({error:'There was an error processing the transaction'});

		});
	}):

	app.listen(3000, () => console.log('Example app listening on port 3000!'))
});
