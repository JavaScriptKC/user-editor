module.exports = function (app, db) {
   app.get('/', function (req, res) {
      db.collection('nodelabs-users', function (err, collection) {
      collection.find().toArray(function (err, users) {
            res.render('index.jade', { users: users });
         });
      });
   });
};