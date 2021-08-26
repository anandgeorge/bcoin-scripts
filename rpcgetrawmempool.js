const bcoin = require('bcoin');

let verbose;
// verbose= 1;
verbose= 0;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getrawmempool', [ verbose ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});