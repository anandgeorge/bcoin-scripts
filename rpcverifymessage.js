const bcoin = require('bcoin');

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

let address, signature, message;

address='1Cdid9KFAaatwczBwBttQcwXYCpvK8h7FK';
signature='MEQCIAwF9NPMo5KBRsCWTBJ2r69/h7CfDl+RQfxxwAbNp1WJAiAiubiK5rg9MugiU7EHpwbJLc3b356LAedob0ePI40Wmg==';
message='hello';

(async () => {
  const res = await rpc.execute('verifymessage', [ address, signature, message ]);

  console.log(res);
})().catch((err) => {
  console.error(err.stack);
});