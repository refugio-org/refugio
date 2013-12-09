var Place = require('../models/place.js');

var user = require('./user.js')
    , categories = require('./admin/categories.js')
    , items = require('./admin/items.js')
    , reservations = require('./admin/reservations.js');

var index = function(req, res) {
  Place.find(function(err, found) {
    if (err) throw err;

    res.render("admin/index", {places: found});
    // only for easy of development, not to be checked in...
    //res.redirect('/admin/reservations');
  });
}

exports.initAdministrationRoutes = function(server) {
  // authenticated only
  server.get('/admin', user.isAuthed, index);

  server.get('/admin/categories', user.isAuthed, index);
  server.get('/admin/categories/:id', user.isAuthed, index );

  server.get('/admin/items', user.isAuthed, index );
  server.get('/admin/items/:id', user.isAuthed, index );
  server.get('/admin/items/byPlace/:id', user.isAuthed, index );

  server.get('/admin/reservations', user.isAuthed, reservations.list );
  server.get('/admin/reservations/byPlace/:id', user.isAuthed, reservations.byPlace );
}
