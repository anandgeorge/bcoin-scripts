const bcoin = require('bcoin');
const Client = bcoin.http.Client;

const client = new bcoin.http.Client({
    uri: 'http://173.249.33.195:8332',
    apiKey: 'patalmypal'
});

const rpc = new bcoin.http.RPCClient({
	uri: 'http://173.249.33.195:8332',
	apiKey: 'patalmypal'
});

(async() => {
    await client.open();
    var mempoolTxs = await client.getMempool();
    console.log(mempoolTxs);
    mempoolTxs = mempoolTxs.slice(0,5);

    for (var j = 0; j < mempoolTxs.length; j++) {
        verbose = 0;
        txhash = mempoolTxs[j];
        const rawtx = await rpc.execute('getrawtransaction', [txhash, verbose]);
        const decoderawtransaction = await rpc.execute('decoderawtransaction', [rawtx]);
        console.log(rawtx, decoderawtransaction);
        // const out = await db.collection('transactions').update({ _id: txhash }, { $set: { raw: rawtx, height: i, decode: decodetransaction } }, { upsert: true });
    }
})().catch((err) => {
    console.error(err.stack);
});