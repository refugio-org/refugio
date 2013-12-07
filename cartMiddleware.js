var Reservation = require('./models/reservation.js');

// todo 
// * lots of stuff

var loadCart = function(req, res, fn) {
	var now = new Date();
	
	console.log(req.session);
	if (typeof req.session.cartId == "undefined") {
		// create new reservation
		var reservation = new Reservation()
		reservation.expires = new Date(now.getTime() + 1000 * 60 * 60 * 15);
		reservation.save(function(err, r) {
			if (err) throw err;
			console.log('loadCart: created a new cart');
			req.reservation = r;
			req.session.cartId = r._id;
			fn();
		});
	} else {
		// load existing cart
		Reservation.findById(req.session.cartId, function(err, found) {
			if (err) throw err;
			
			if (found) {
				// there is a cart like that
				
				// check if reservation is still valid
				if (found.expires > now) {
					console.log('loadCart: found a valid cart');
					req.reservation = found;
					fn()
				} else {
					// trash it
					console.log('loadCart: found an expired cart');
					Reservation.update(
						{ _id: found._id },
						{ $set: { items: [], expires: new Date(now.getTime() + 1000 * 60 * 60 * 15)  }},
						fn
					);
				}
			} else {
				// there is no such cart
				console.log('loadCart: did not find such a cart.. WARNING!!');
			}
		});
	}
}

module.exports = {
	loadCart: loadCart
}