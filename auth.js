const bcoin = require('bcoin');
const Client = bcoin.http.Client;

const client = new bcoin.http.Client({
	uri: 'http://173.249.33.195:8332',
  apiKey: 'patalmypal'
});

(async () => {
  await client.open();
  const info = await client.getInfo();

  console.log(info);

  await client.close();
})().catch((err) => {
  console.error(err.stack);
});