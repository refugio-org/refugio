// reqs
var request = require('request');
var url = require('url');

// models
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
      var qrRequest = {
        'method': 'GET',
        'protocol': 'https',
        'hostname': 'mutationevent-qr-code-generator.p.mashape.com',
        'pathname': '/generate.php',
        'query': {
          'content': 'http://refugio-test.herokuapp.com/reservation/'+req.reservation._id,
          'quality': 'quality',
          'size': 'size',
          'type': 'url'
        },
      };

      var opts = {
        url: url.format(qrRequest),
        headers: {
          "Accept": "application/json",
          "X-Mashape-Authorization": "rjumr0yqea5lxk3aejm7sw0lqqbwxt" // we could put this in a env variable if we had heroku access....
        }
      };

      function callback(error, qrResp, qrBody) {
        if (!error && qrResp.statusCode == 200) {
            var qrInfo = JSON.parse(qrBody);
            res.render("cart/checkout.jade", {reservation: req.reservation, items: found, qr: qrInfo});
        } else {
          // todo we should have more of these:
          res.render('500.jade', {title:'500: Internal Server Error', error: error})
        }
      }

      request(opts, callback);
    });
  } else {
    res.redirect('/');
  }
};
