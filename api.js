var Place = require('./models/place.js');
// var Post = require('../models/post.js');
 
exports.create = function(req, res) {
    new Place({name: req.params.name}).save(function(err, obj){
    	if (err) throw err;
    	console.log('saved' + obj);
    	res.send("saved");
    });
}
 
exports.list = function(req, res) {
  var qry = Place.find({}, function(err, results) {
  	if (err) throw err;
    // res.send(threads);
    console.log(results)
    res.render("placeList.jade", {places: results});
    // res.send(results);
  });
}