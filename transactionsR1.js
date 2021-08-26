const bcoin = require('bcoin');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';
var r = 1;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

MongoClient.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	(async () => {
		const start = await db.collection('rawtransactions').find().sort({height:-1}).limit(1).toArray();
		if(start && start[0]) {
			r = start[0]['height'] + 1;
		}
		console.log(start, r);
	 	const blockcount = await db.collection('blocks').count();
		console.log(blockcount);
		for(var i=r; i < blockcount; i++) {
			const block = await db.collection('blocks').findOne({height:i});
			const txs = block.tx;
			// console.log(txs);
			for(var j=0; j < txs.length; j++) {
				var transactions = [];
				verbose=1;
				txhash = txs[j];
				let rawtx = await rpc.execute('getrawtransaction', [ txhash, verbose ]);
				rawtx._id = rawtx.txid;
				rawtx.height = i;
				const w = await db.collection('rawtransactions').insertOne(rawtx);

				var outs = rawtx.vout;
				// console.log(outs);
				for(var k=0; k<outs.length; k++) {
					var out = outs[k];
					out.txid = txhash;
					out.idx = out.n;
					out.address = out.scriptPubKey.addresses[0];
					out.utxo = i;
					out.spent = false;
					delete out.scriptPubKey;
					delete out.n;
					transactions.push(out);
				}
				// console.log(transactions);
				const r = await db.collection('transactions').insertMany(transactions);
				var ins = rawtx.vin;
				// console.log(ins);
				var updateSet = {};
				updateSet['$set'] = {
					stxo : i,
					spent : true
				}
				// console.log('updateSet', updateSet);
				for(var l=0; l<ins.length; l++) {
					var inr = ins[l];
					if(inr.txid && inr.vout) {
						var query = {};
						query['txid'] = inr.txid;
						query['idx'] = inr.vout;
						// console.log(query);
						const u = await db.collection('transactions').update(query, updateSet);						
					}
				}

			}
		}	
	})().catch((err) => {
		setTimeout(function() {
			console.error(err.stack, r);
	  		process.exit(1);
		}, 10000)

	});
});

  
