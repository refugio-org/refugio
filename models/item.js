var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// we will have multiple types of items such as sizableItem, verderblichItem, etc... 
var itemModel = new Schema({
  name: {type: String},
  description: {type: String},
  icon: {type: String},
  location: { type: Schema.Types.ObjectId, ref: 'Place' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});



module.exports = mongoose.model('Item', itemModel);