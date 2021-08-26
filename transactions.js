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
		// const start = await db.collection('transactions').find().sort({height:-1}).limit(1).toArray();
		// const start = 1;
		// console.log(start);
		// const r = start[0]['height'] - 1;
		const r = 1;
	 	let blockcount = await rpc.execute('getblockcount');
		console.log(blockcount);
		for(var i=r; i < blockcount; i++) {
			const block = await db.collection('blocks').findOne({height:i});
			const txs = block.tx;
			console.log(txs);
			for(var j=0; j < txs.length; j++) {
				verbose=1;
				txhash = txs[j];
				let rawtx = await rpc.execute('getrawtransaction', [ txhash, verbose ]);
				rawtx._id = txhash;
				rawtx.height = i;
				const r = await db.collection('transactions').insertOne(rawtx);
			}			
		}	
	})().catch((err) => {
	  	console.error(err.stack);
	  	process.exit(1);
	});
});

  
