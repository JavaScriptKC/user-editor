var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Server = mongodb.Server;

var server = new Server('localhost', 27017);
var db = new Db('nodelabs-users', server, { safe: true });

app.engine('jade', require('jade').__express);
app.use(express.static('public'));
app.use(bodyParser());

require('./routes/index.js')(app, db);

db.open(function (err) {
   if (err) throw err;
   app.listen(3000);
});

