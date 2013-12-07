var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var toplevelCategoryModel = new Schema({
	name: {type: String},
	children: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('ToplevelCategory', toplevelCategoryModel);