'use strict'
const mongoose = require('mongoose')

let host = 'localhost',
    port = 27017,
    dbname = 'QingBlog-test'


let db = mongoose.connection
db.once('open', function () {
    console.log("connect db successfully!");
});

db.on('error', function (err) {
    console.log("connect db fail, err: " + err);
});

function connect_db() {
    mongoose.connect(`mongodb://${host}:${port}/${dbname}`, {useMongoClient: true})
}

module.exports = connect_db