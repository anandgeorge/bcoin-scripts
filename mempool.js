const cron = require('node-cron');
const bcoin = require('bcoin');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';

const rpc = new bcoin.http.RPCClient({
	uri: 'http://localhost:8332',
	apiKey: 'patalmypal'
});

MongoClient.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	cron.schedule('* * * * *', function(){
		(async () => {
			const res = await rpc.execute('getmempoolinfo');
			res.ts = new Date();
			const r = await db.collection('mempool').insertOne(res);
			console.log(res);
		})().catch((err) => {
			console.error(err.stack);
			process.exit(0);
		});
	});
});


 
