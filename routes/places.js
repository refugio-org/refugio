var Place = require('../models/place.js');

exports.list = function(req, res) {
    var query = Place.find({}, function(err, results) {
        if (err) throw err;
        console.log(results)
        res.render("placeList.jade", {places: results});
    });
}