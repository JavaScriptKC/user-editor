var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
   app.get('/', function (req, res) {
      db.collection('nodelabs-users', function (err, collection) {
      collection.find().toArray(function (err, users) {
            res.render('index.jade', { users: users });
         });
      });
   });

   app.get('/user/:id', function (req, res) {
      var id = req.params.id;
      db.collection('nodelabs-users', function (err, collection) {
         collection.findOne({ _id: ObjectID(id) }, function (err, user) {
            res.render('user.jade', { user: user });
         });
      });
   });
};