'use strict';

var Place = require('../../models/place.js'),
  Item = require('../../models/item.js'),
  Reservation = require('../../models/reservation.js');


var isNull = function(res, mightBeNull) {
  if (mightBeNull === null || mightBeNull === undefined) {
    res.redirect('/admin');
    return true;
  }
  return false;
};

exports.list = function(req, res) {
  Reservation.find(function(err, reservations) {
    if (err) throw err;

    res.render("admin/reservations/list", {
      reservations: reservations
    });
  });
}

exports.byPlace = function(req, res) {
  Place.findOne({
    _id: req.params.id
  }, function(err, foundPlace) {
    if (err) throw err;
    if(isNull(res, foundPlace)) return;

    console.log('foundPlace:', foundPlace);

    Item.find({
      location: foundPlace._id
    }, function(err, foundItems) {
      if (err) throw err;
      if(isNull(res, foundItems)) return;
      console.log('foundItems by foundPlace:', foundItems);

      var itemsInPlace = foundItems.map(function(t) {
        return t._id
      });

      Reservation.find({
        items: {
          $in: itemsInPlace
        }
      }, function(err, reservationsInPlace) {
        console.log('reservationsInPlace by foundPlace:', reservationsInPlace);
        res.render("admin/reservations/by_place", {
          reservations: reservationsInPlace,
          location: foundPlace
        });
      });
    });
  });
}