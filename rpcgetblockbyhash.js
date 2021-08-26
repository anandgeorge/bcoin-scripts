const bcoin = require('bcoin');

let blockhash, details, verbose;
blockhash='000000007d07681a955b7bb9d96c473e847395b592b6e9e5a73b15b594bd4013';
verbose=1;
details=0;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getblock', [ blockhash, verbose, details ]);
  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});