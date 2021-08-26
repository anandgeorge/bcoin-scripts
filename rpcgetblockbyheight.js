const bcoin = require('bcoin');

let blockhash, details, verbose;
blockheight=45513;
verbose=1;
details=0;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getblockbyheight', [ blockheight, verbose, details ]);
  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});