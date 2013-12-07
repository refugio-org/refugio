var Item = require('../models/item.js');

exports.demo = function(req, res) {
  res.render("shoppingDemo.jade", {});
}

exports.list = function(req, res) {
    Item.find({}, function(err, items) {
        if (err) {
            throw err;
        }

        res.render("shoppingList.jade", {items: items});
    });
}