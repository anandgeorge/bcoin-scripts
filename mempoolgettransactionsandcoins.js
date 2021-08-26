const cron = require('node-cron');
const bcoin = require('bcoin');
const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';

const rpc = new bcoin.http.RPCClient({
        uri: 'http://173.249.33.195:8332',
        apiKey: 'patalmypal'
});

MongoClient.connect(url, function(err, cl) {
    console.log("Connected successfully to server");
    const db = cl.db(dbName);
    cron.schedule('*/2 * * * *', function(){
        (async() => {
            var mempoolTxs = await rpc.execute('getrawmempool', [ 0 ]);
            ts =new Date();
            ts.setSeconds(0);
            ts = new Date(ts);
            overlap = await db.collection('mempoolraws').find({txid:{$in:mempoolTxs}}).toArray();
            // overlap = await db.collection('mempoolraws').find().limit(10).toArray();
            overlapTxs = _.map(overlap, 'txid');
            pooltotal = overlap.length > 0 ? _.sumBy(overlap,'total') : 0;
            mempoolTotalTxs = _.cloneDeep(mempoolTxs);
            count = mempoolTotalTxs.length;
            mempoolTxs = _.difference(mempoolTxs, overlapTxs);
            console.log(mempoolTotalTxs.length,mempoolTxs.length,pooltotal);
            records = [];         
            for (var j = 0; j < mempoolTxs.length; j++) {
                verbose = 0;
                txhash = mempoolTxs[j];
                rawtx = await rpc.execute('getrawtransaction', [txhash, verbose]);
                decoderawtransaction = await rpc.execute('decoderawtransaction', [rawtx]);
                total = 0;
                // update start
                var addresses = [];
                outs = _.map(decoderawtransaction.vout, function(at){
                  total += at.value;
                  if(at.scriptPubKey && at.scriptPubKey.addresses) {
                      addresses = addresses.concat(at.scriptPubKey.addresses);
                  }
                  return {value:at.value, asm:at.scriptPubKey.asm}
                });
                console.log(addresses[0]);
                const coins = await db.collection('wif').find({_id:{$in:addresses}}).toArray();    
                if(coins.length > 0) {
                    console.log('Got coins', decoderawtransaction);
                    rec = await db.collection('coins').insertOne(decoderawtransaction);
                }        
                // update end
                outs = _.map(decoderawtransaction.vout, function(at){
                  total += at.value;
                  return {value:at.value, asm:at.scriptPubKey.asm}
                });
                pooltotal += total;
                record = {txid:txhash, size:decoderawtransaction.size,vout:outs,total:total}
                records.push(record);
            }
            if(records.length > 0) {
                    rec = await db.collection('mempoolraws').insertMany(records);
            }
            mempoolTxRec = {ts: ts, txns: mempoolTotalTxs, pooltotal:pooltotal,count:count};
            console.log(ts, pooltotal, count);
            rec = await db.collection('mempooltx').insertOne(mempoolTxRec);
        })().catch((err) => {
            console.error(err.stack);
        });
    });
});