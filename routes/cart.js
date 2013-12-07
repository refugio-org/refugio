var Item = require('../models/item.js');

exports.addItem = function(req, res) {
	console.dir(req.reservation);
	Item.findById(req.body.product, function(err, found) {
    if (err) throw err;
		

		res.send(201);
	})
}
