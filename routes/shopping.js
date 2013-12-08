var Item = require('../models/item.js');

exports.list = function(req, res) {
  Item.find({}, function(err, items) {
    if (err) throw err;
    res.render("shoppingList.jade", {items: items});
  });
}

exports.listForPlace = function(req, res) {
  Item.find({location: req.params.id}, function(err, items) {
    if (err) throw err;
    res.render("shoppingList.jade", {items: items});
  });
}