var Place = require('../models/place.js');

exports.list = function(req, res) {
  Place.find(function(err, found) {
    if (err) throw err;

    res.render("admin/index.jade", {places: found});
  });
}
