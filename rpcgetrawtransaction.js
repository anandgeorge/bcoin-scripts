const bcoin = require('bcoin');
const Client = bcoin.http.Client;

let txhash, verbose=1;
// txhash='0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2';
// txhash='7957a35fe64f80d234d76d83a2a8f1a0d8149a41d81de548f0a65a8a999f6f18';
// txhash='e0eaf35f9b380b28e4b4b92e7fc11868717ecbd8a04a1d800c97c5ad07c094e1';
txhash='e35d17f3ebab3c9740202f16778c43f971666d3e02b2126e3cb80b675cba4caf';

// txhash='54517b1993f08943f8d82d57a2e31746a2613f3f1949b3dfe8115c7ca677db00';

// mempool transaction
// txhash='43bda2eb1fd1f619d36a3f08942b68d7bb573fa64a5248a2c64f6df400fd6937';

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getrawtransaction', [ txhash, verbose ]);
  console.log(JSON.stringify(res));
})().catch((err) => {
  console.error(err.stack);
});