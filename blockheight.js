const bcoin = require('bcoin');
const Client = bcoin.http.Client;

const client = new bcoin.http.Client({
	uri: 'http://173.249.33.195:8332',
  apiKey: 'patalmypal'
});

let blockHash, blockHeight;
blockHash='00000000cabd2d0245add40f335bab18d3e837eccf868b64aabbbbac74fb21e0';
blockHeight='1500';

(async () => {
  await client.open();
  const blockByHash = await client.getBlock(blockHash);
  const blockByHeight = await client.getBlock(blockHeight);

  console.log(blockByHash, blockByHeight);

  await client.close();
})().catch((err) => {
  console.error(err.stack);
});