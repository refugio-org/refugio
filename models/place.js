var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var placeModel = new Schema({
  name: {type: String},
  address: {type: String},
  telefon: {type: String},
  image: {type: String}
})

module.exports = mongoose.model('Place', placeModel);