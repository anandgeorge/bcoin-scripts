const bcoin = require('bcoin');
const Client = bcoin.http.Client;

let blockHash, blockHeight;
blockHash='000000007d07681a955b7bb9d96c473e847395b592b6e9e5a73b15b594bd4013';
blockHeight='450000';

const client = new bcoin.http.Client({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async () => {
  await client.open();
  const blockByHash = await client.getBlock(blockHash);
  const blockByHeight = await client.getBlock(blockHeight);

  console.log(blockByHash, blockByHeight);

  await client.close();
})().catch((err) => {
  console.error(err.stack);
});