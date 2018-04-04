'use strict'
const mongoose = require('mongoose')

let host = 'localhost',
    port = 27017,
    dbname = 'QingBlog-test'

mongoose.connect(`mongodb://${host}:${port}/${dbname}`)
let db = mongoose.connection
db.once('open', function () {
    console.log("connect db successfully!");
});

db.on('error', function (err) {
    console.log("connect db fail, err: " + err);
});

process.on('SIGINT', function() {
    console.log('db is closing....');
    db.close(true, function(err) {
        console.log('db closed!');
        process.exit(err ? 1 : 0);
    });
});

module.exports = db