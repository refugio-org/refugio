var Place = require('../models/place.js');


// list all places
exports.list = function(req, res) {
  Place.find({}, function(err, found) {
    if (err) throw err;
    res.render("index.jade", {places: found});
  });
};
