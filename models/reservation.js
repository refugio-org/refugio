var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var reservationModel = new Schema({
  name: {type: String},
  expires: {type: Date},
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Reservation', reservationModel);