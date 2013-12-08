'use strict';

var Place = require('../../models/place.js')
    , Reservation = require('../../models/reservation.js');

exports.list = function(req, res){
  Reservation.find(function(err, found) {
    if (err) throw err;
    console.log(found);
    res.render("admin/reservations", { reservations: found });
  });
}