var Item = require('../models/item.js');
var Reservation = require('../models/reservation.js');

exports.listItems = function(req, res) {
  if (req.reservation.items.length > 0)  {
    Item.find({_id: {$in: req.reservation.items}}, function(err, found) {
      if (err) throw err;
      // console.log("items:"+found);
      res.render('cart/listItems', {reservation: req.reservation, items: found});
    });
  } else {
    res.render('cart/listItems', {reservation: req.reservation, items: []});
  }
};

exports.addItem = function(req, res) {
  Item.findById(req.body.product, function(err, found) {
    if (err) throw err;
    Reservation.findByIdAndUpdate(req.reservation._id, {$push: { items: found._id } }, function(err) {
      if (err) throw err;
      
      res.send(201);
    });

  });
};

exports.checkout = function(req, res) {
  if (req.reservation.items.length > 0) {
    Item.find({_id: {$in: req.reservation.items}}, function(err, found) {
      if (err) throw err;

      res.render("cart/checkout.jade", {reservation: req.reservation, items: found});
    });
  } else {
    res.redirect('/');
  }
};
