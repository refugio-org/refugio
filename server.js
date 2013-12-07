var express = require('express');
var mysql = require('mysql');

var server = express();

var db_config = {
	host: '',
	user: '',
	password: '',
  waitForConnections: true
};

// express settings
server.configure(function(){
  server.use(express.logger({format: ':method :url - :status'}));
  server.set('view engine', 'jade');
  server.set('view options', {layout: false});
  server.set('views', __dirname + '/jade');
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(express.cookieParser());
  server.use(express.session({secret: 'supersupersecret', key: 'refugio.sid' }));
  // server.use(server.router);
  server.use(express.static(process.cwd() + '/public'));
});

server.configure('development', function() {
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function() {
  server.use(express.errorHandler());
});


var pool = mysql.createPool(db_config);



server.get('/', function(req, res){
	res.render('index.jade');
});

server.listen(3000);