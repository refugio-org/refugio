// web framework: http://expressjs.com
var express = require('express');
var mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// connect db
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/refugio');

// middleware
var cartMiddleware = require('./cartMiddleware.js');

// app server
var server = module.exports = express();

// express settings
server.configure(function() {
  // log requests
  server.use(express.logger({
    format: ':method :url - :status'
  }));

  // setup jade rendering
  // docu: http://jade-lang.com
  server.set('view engine', 'jade');
  server.set('views', __dirname + '/jade');

  // parse headers and cookies and stuff
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(express.cookieParser());
  server.use(express.session({
    secret: 'supersupersecret',
    key: 'refugio.sid'
  }));

  // serve static resoruces (css and stuff)
  server.use(express.static(process.cwd() + '/public'));

  // use passport for sessions
  server.use(passport.initialize());
  server.use(passport.session());

  // always load or create a cart
  server.use(cartMiddleware.loadCart);
});

// show errors in development
server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

server.configure('production', function() {
  server.use(express.errorHandler());
});

// passport initialization
passport.use(new LocalStrategy(
  function(username, password, done) {
    api.users.findById({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      user.validPassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch)
          return done(null, false, {
            message: 'Incorrect password.'
          });

        return done(null, user);
      });
    });
  }
));

// handlers
var management = require('./routes/management.js');
var places = require('./routes/places.js');
var categories = require('./routes/categories.js');
var shopping = require('./routes/shopping.js')
var cart = require('./routes/cart.js')

server.get('/cats', categories.list);
server.get('/management', management.list);

// shopping handlers
server.get('/', places.list);

// cart handlers
server.get('/cart', cart.listItems);
server.post('/cart/item', cart.addItem);
server.get('/cart/checkout', cart.checkout);

server.get('/:id', shopping.listForPlace);
server.get('/shopping', shopping.list);

if (!module.parent) {
  require('./reference/addDataToDb.js');
}

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", port, server.settings.env);
});