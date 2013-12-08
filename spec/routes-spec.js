var request = require('supertest')

var app = require('../server.js');

describe('POST /cart', function(){
  it('respond with 201', function(done){
  	// Given
  	// var service = {};
  	// service.addItem = function(){
  	// 	return {
  	// 		_id: '4711'
  	// 	}
  	// };


    request(app)
    	.post('/cart/item')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect('Location', '/cart/item/4711')
      .expect(201,done);
  });
});