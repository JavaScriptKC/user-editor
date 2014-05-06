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

   app.post('/user/remove', function (req, res) {
      var id = req.body.id;
      db.collection('nodelabs-users', function (err, collection) {
         collection.remove({ _id: ObjectID(id) }, function (err, numRemoved) {
            res.redirect('/');
         });
      });
   });

   app.post('/user/save', function (req, res) {
      var id = req.body.id;
      db.collection('nodelabs-users', function (err, collection) {

         var saveQuery =  {
            $set: {
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               emailAddress: req.body.emailAddress
            }
         };

         collection.update({ _id: ObjectID(id) }, saveQuery, function (err) {
            res.redirect('/user/' + id);
         });
      });
   });
};