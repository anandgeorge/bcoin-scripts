const bcoin = require('bcoin');

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getpeerinfo');
  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});