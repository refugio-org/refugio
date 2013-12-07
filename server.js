// web framework: http://expressjs.com
var express = require('express');
var mongoose = require('mongoose');

// connect db
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/refugio');

// middleware
var cartMiddleware = require('./cartMiddleware.js');

// app server
var server = module.exports = express();

// express settings
server.configure(function() {
    // log requests
    server.use(express.logger({format: ':method :url - :status'}));

    // setup jade rendering
    // docu: http://jade-lang.com
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/jade');

    // parse headers and cookies and stuff
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(express.cookieParser());
    server.use(express.session({secret: 'supersupersecret', key: 'refugio.sid' }));

    // serve static resoruces (css and stuff)
    server.use(express.static(process.cwd() + '/public'));

    // always load or create a cart
    server.use(cartMiddleware.loadCart);
});

// show errors in development
server.configure('development', function() {
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function() {
    server.use(express.errorHandler());
});

// handlers
server.get('/', function(req, res) {
    res.render('index.jade');
});

var management = require('./routes/management.js');
var places = require('./routes/places.js');
var categories = require('./routes/categories.js');
var shopping = require('./routes/shopping.js')
var cart = require('./routes/cart.js')

server.get('/places/:name', places.create);
server.get('/places', places.list);
server.get('/cats',categories.list);
server.get('/management', management.list);
server.get('/shopping', shopping.demo);

server.post('/cart/item', cart.addItem);

if (!module.parent) {
    var port = process.env.PORT || 3000;
    server.listen(port, function() {
        console.log("Express server listening on port %d in %s mode", port, server.settings.env);
    });
}