const bcoin = require('bcoin');
const Client = bcoin.http.Client;

let blockheight;
blockheight=45513;

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  const res = await rpc.execute('getblockhash', [ blockheight ]);
  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});