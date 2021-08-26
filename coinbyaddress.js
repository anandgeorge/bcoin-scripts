const bcoin = require('bcoin');
const Client = bcoin.http.Client;

const client = new bcoin.http.Client({
	uri: 'http://173.249.33.195:8332',
  	apiKey: 'patalmypal'
});

let address;
address=
// '1Cdid9KFAaatwczBwBttQcwXYCpvK8h7FK';
'16vyxSqhxYrW4SJWFajxsGBG2S56u42FSt';
// '1L5szjzxnAHX19GGP5jKMX3Bnad1D9Yx3R';

(async () => {
  await client.open();

  const coins = await client.getCoinsByAddress(address);

  console.log(coins);

  await client.close();
})().catch((err) => {
  console.error(err.stack);
});