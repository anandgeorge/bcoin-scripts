const bcoin = require('bcoin');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

MongoClient.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	(async () => {
	 	let blockcount = await rpc.execute('getblockcount');
		console.log(blockcount);
		const r = await db.collection('blocks').count();
		verbose=1;
		details=0;
		for(var i=r; i < blockcount; i++) {
			const blockbyheight = await rpc.execute('getblockbyheight', [ i, verbose, details ]);
			console.log(blockbyheight);
			const r = await db.collection('blocks').insertOne(blockbyheight);
		}
	})().catch((err) => {
	  	console.error(err.stack);
	  	process.exit(1);
	});
});

  
