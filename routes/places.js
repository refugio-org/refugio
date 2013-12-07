var Place = require('../models/place.js');

exports.create = function(req, res) {
    new Place({name: req.params.name}).save(function(err, obj) {
        if (err) throw err;
        console.log('saved' + obj);
        res.send("saved");
    });
}

exports.list = function(req, res) {
    var query = Place.find({}, function(err, results) {
        if (err) throw err;
        console.log(results)
        res.render("placeList.jade", {places: results});
    });
}