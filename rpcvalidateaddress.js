const bcoin = require('bcoin');

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

let address;
address='1Cdid9KFAaatwczBwBttQcwXYCpvK8h7FK';

(async () => {
  const res = await rpc.execute('validateaddress', [ address ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});