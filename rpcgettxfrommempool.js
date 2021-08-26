const bcoin = require('bcoin');

let txhash='386ff69744f912e2b37addc7453f46878495d97f576d15a8eeb3158c0c056709';
let index=0;
let includemempool=1;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('gettxout', [ txhash, index, includemempool ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});