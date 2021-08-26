const express = require('express')
const app = express()
const bcoin = require('bcoin');

const rpc = new bcoin.http.RPCClient({
	uri: 'http://123.456.78.901:2345',
	apiKey: 'apiKey'
});

app.get('/getblockcount', function (req, res) {
	(async () => {
	  const rpcres = await rpc.execute('getblockcount');
	  console.log(rpcres);
	  res.json(rpcres);
	})().catch((err) => {
	  console.error(err.stack);
	});
})

app.get('/getbestblockhash', function (req, res) {
	(async () => {
  		const rpcres = await rpc.execute('getbestblockhash');
	  	console.log(rpcres);
	  	res.json(rpcres);
	})().catch((err) => {
	  console.error(err.stack);
	});
})

app.get('/getrawtransaction/:txhash', function (req, res) {
	let verbose = 0;
	(async () => {
  		const rpcres = await rpc.execute('getrawtransaction', [ req.params.txhash, verbose ]);
	  	console.log(rpcres);
	  	res.json(rpcres);
	})().catch((err) => {
	  console.error(err.stack);
	});
})

app.get('/getblockbyheight/:blockheight', function (req, res) {
	let verbose = 1;
	let details=0;
	(async () => {
  		const rpcres = await rpc.execute('getblockbyheight', [ req.params.blockheight, verbose, details ]);
	  	console.log(rpcres);
	  	res.json(rpcres);
	})().catch((err) => {
	  console.error(err.stack);
	});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
