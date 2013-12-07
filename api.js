var Place = require('./models/place.js');
// var Post = require('../models/post.js');
 
exports.create = function(req, res) {
    new Place({name: req.params.name}).save();
}
 
exports.list = function(req, res) {
  var qry = Place.find({}, function(err, results) {
  	if (err) throw err;
    // res.send(threads);
    console.log(results)
    res.render("placeList.jade", {locals: results})
  });
}