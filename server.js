// SERVER SETUP
var dev = process.env.PORT ? false : true;
var port = process.env.PORT || 5000;

// REST API
var express = require('express');
var app = express.createServer();

// CONFIGURE THE API
app.configure(function () {
	/*app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		next();
	});*/
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/public');
	app.set('view options', { layout: false });
});

// DATABASE PERSISTENCE
var server = require('nano')(dev ? 'http://127.0.0.1:5984/' : process.env.CLOUDANT_URL);
var db = server.use('test01');

// LOAD THE FRONT-END
app.get('/', function(req, res) {
	res.render('index.jade', { dev: dev });
});

// GET ROUTES
app.get('/users', function(req, res) {
	var docs = [];
	db.view('users', 'all', function(err, body) {
		if (!err) {
			body.rows.forEach(function(doc) {
				docs.push(doc);
			});
			res.send(JSON.stringify(docs));
		}
	});
});

// START THE SERVER
app.listen(port);
console.log('app running on port', port);