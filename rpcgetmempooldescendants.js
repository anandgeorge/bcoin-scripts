const bcoin = require('bcoin');

let txhash, verbose;
txhash='2a160625c897639eb4c4bf4d341809db847103aaddac7d1f61bccec076092ec4'; // change this value; may not exist in the mempool then
verbose=1;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getmempooldescendants', [ txhash, verbose ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});