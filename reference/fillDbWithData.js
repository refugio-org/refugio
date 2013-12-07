var mongoose = require('mongoose');

// our models
var Place = require('../models/place');
var Category = require('../models/category');
var ToplevelCategory = require('../models/toplevelCategory')
var Item = require('../models/item');
var Reservation = require('../models/reservation');

function saveCb(arr) {
  return function(err, obj) {
    if (err) throw err;
    arr.push(obj)
    console.log("Saved:" + obj);
  }
}

// connect db
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/refugio');

var tlCat = []
var cats = []
var places = []
var items = []

function makePlaces() {
  var p1 = new Place({ "name" : "Gängeviertel", "address" : "just around the corner", "telefon" : "040-123456" });
  var p2 = new Place({ "name" : "St.Pauli Kirche", "address" : "farfaraway 1234", "telefon" : "040-54321" });

  p1.save(saveCb(places));
  p2.save(saveCb(places));

  makeCats();
}


function makeCats() {
  var c1 = new Category({name: "zaehneputzen", cssClass: "teeth"});
  var c2 = new Category({name: "waschen", cssClass: "wash"});
    
  var c3 = new Category({name: "Schlafsack", cssClass: "sleepingbag"});
  var c4 = new Category({name: "Isomatte", cssClass: "matress"});
  c1.save(function(err, cat1) {
    if (err) throw err;
    cats.push(cat1);
    c2.save(function(err, cat2) {
      if (err) throw err;
      cats.push(cat2);
      c3.save(function(err, cat3) {
        if (err) throw err;
        cats.push(cat3);
        c4.save(function(err, cat4) {
          if (err) throw err;
          cats.push(cat4);
          var t1 = new ToplevelCategory({name:"bathroom/health", children: [cat1._id, cat2._id]});    
          t1.save(saveCb(tlCat));
          var t2 = new ToplevelCategory({name:"bedroom/sleep/outside", children: [cat3._id, cat4._id]});    
          t2.save(saveCb(tlCat));
        
          makeItems();
        });
      });
    });
  });

    
}

function makeItems() {

  var i1 = new Item({name: "zahnbuerste", description: "youknow", location: places[0]._id, category: cats[0]._id});
  var i2 = new Item({name: "zahnpasta", description: "youknow", location: places[0]._id, category: cats[0]._id});
  var i3 = new Item({name: "seife", description: "youknow", location: places[1]._id, category: cats[1]._id });
  var i4 = new Item({name: "duschgel", description: "youknow", location: places[1]._id, category: cats[1]._id});
  var i5 = new Item({name: "schlafsack", description: "youknow", location: places[0]._id, category: cats[2]._id});
  var i6 = new Item({name: "isomatte", description: "youknow", location: places[0]._id, category: cats[3]._id});
  
  i1.save(saveCb(items));
  i2.save(saveCb(items));
  i3.save(saveCb(items));
  i4.save(saveCb(items));
  i5.save(saveCb(items));
  i6.save(saveCb(items));
}

makePlaces();
