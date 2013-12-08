var Item = require('../models/item.js');
var Place = require('../models/place.js');

exports.list = function(req, res) {
  Item.find({}, function(err, items) {
    if (err) throw err;
    res.render("shoppingList.jade", {items: items});
  });
}

exports.listForPlace = function(req, res) {
  Place.findOne({name: req.params.name}, function(err, foundPlace) {
    if (err) throw err;

    if (foundPlace) {
      Item.find({location: foundPlace._id}, function(err, items) {
        if (err) throw err;
        
        res.render("shoppingList.jade", {place: foundPlace, items: items});
      });
    } else {
      // place not found
    }
  });
  
}