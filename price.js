const cron = require('node-cron');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';
const request = require('request');

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    cron.schedule('*/10 * * * *', function() {
        request('https://api.coinmarketcap.com/v1/ticker/bitcoin/', function(error, response, body) {
                var res = JSON.parse(body);
                res = res[0];
            console.log(response.statusCode, res);
            if (response.statusCode === 200) {
                res.ts = new Date();
                db.collection('bitcoin').insertOne(res, function(err, result) {
                        if(err) {
                                console.log('Error in insert', new Date());
                        }
                        else {
                                console.log(res);
                        }

                });
            }
            else {
                        console.log('Error in response', new Date());
            }
        });
    });
});
