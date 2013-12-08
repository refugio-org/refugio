'use strict';

var Place = require('../../models/place.js'),
  Reservation = require('../../models/reservation.js');

exports.list = function(req, res) {
  Reservation.find(function(err, found) {
    if (err) throw err;
    res.render("admin/reservations/list", {
      reservations: found
    });
  });
}

exports.show = function(req, res) {
  Reservation.find({
    _id: req.params.id
  }, function(err, found) {
    if (err) throw err;
    res.render("admin/reservations/show", {
      reservation: found
    });
  });
}