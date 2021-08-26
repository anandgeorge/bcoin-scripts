const bcoin = require('bcoin');

let txhash;
txhash='0a2137a6d9d6139731c81d3131554bd49bf819da340f17a32b8417d12fffff06'; // change this value; may not exist in the mempool then

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getmempoolentry', [ txhash ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});