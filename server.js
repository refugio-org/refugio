// web framework: http://expressjs.com
var express = require('express');
var mongoose = require('mongoose');

// connect db
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/refugio');


// app server
var server = express();

// express settings
server.configure(function(){

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
});

// show errors in development
server.configure('development', function() {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function() {
  server.use(express.errorHandler());
});

// handers
server.get('/', function(req, res){
	res.render('index.jade');
});

var api = require('./api.js');
// server.post('/thread', api.post);
server.get('/places/:name', api.create);
server.get('/places', api.list);


server.listen(process.env.PORT || 3000);
