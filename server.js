// SERVER SETUP
var dev = process.env.PORT ? false : true;
var port = process.env.PORT || 5000;


// DATABASE PERSISTENCE
var server = require('nano')(dev ? 'http://127.0.0.1:5984/' : process.env.CLOUDANT_URL);
var db = server.use('test01');


// REST API
var express = require('express');
var app = express.createServer();


// AUTHENTICATION
var crypto = require('crypto');
function checkAuth(req, res, next) {
	if (!req.session || !req.session.user_id) {
		res.render('login.jade', { dev: dev });
	} else {
		next();
	}
}


// CONFIGURE THE API
var stylus = require('stylus');
app.configure(function () {
	app.use(stylus.middleware({src: __dirname + '/public'}));
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/public');
	app.set('view options', { layout: false });
	app.use(express.cookieParser()); 
	app.use(express.session({ secret: 'tacos' }));
});
var u = require('underscore');

// LOAD THE FRONT-END
app.get('/', checkAuth, function(req, res) {
	res.render('index.jade', {
		dev: dev,
		user_email: req.session.user_email,
		user_name: req.session.user_name,
	});
});


// LOGIN SCREEN AND METHODS
// render the login page
app.get('/login', function(req, res) {
	res.render('login.jade', { dev: dev });
});
// login using credentials
app.post('/login', express.bodyParser(), function(req, res) {
	if (req.body && req.body.email && req.body.pass) {
		db.view('users', 'all', { keys: [req.body.email] }, function(err, body) {
			if (!err) {
				var pass = crypto.createHash('md5').update(req.body.pass).digest("hex");
				if (body.rows.length > 0) {
					if (body.rows[0].value.pass == pass) {
						req.session.user_id = body.rows[0].id;
						req.session.user_email = body.rows[0].value.email;
						req.session.user_name = body.rows[0].value.name;
						res.send({ status: 'success', body: '' });
					} else { res.send({ status:'error', body: 'the password was not correct' }); }
				} else { res.send({ status: 'error', body: 'the user does not exist' }); }
			} else { res.send({ status:'error', body: 'an issue occured with the lookup' }); }
		});
	} else { res.send({ status:'error', body: 'not all of the necessary information was provided' }); }
});
// log out the current user
app.post('/logout', function(req, res) {
	req.session.destroy();
	res.end();
});


// GET ROUTES
// get all the users
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
// get all the bugs
app.get('/bugs', function(req, res) {
	var docs = [];
	db.view('bugs', 'all', function(err, body) {
		if (!err) {
			body.rows.forEach(function(doc) {
				var temp = doc.value;
				temp.id = doc.value._id;
				delete temp._id;
				temp.history = u.map(temp.history, function(h) { // add in the md5 hash
					h.hash = crypto.createHash('md5').update(h.email).digest("hex");
					return h;
				});
				docs.push(temp);
			});
			res.send(docs);
		} else { re.send({ status: 'error', body: 'an error occured with the lookup' }); }
	});
});


// PUT ROUTES
// update a specific bug
app.put('/bugs/:id', express.bodyParser(), function(req, res) {
	if (req.body) {
		var doc = req.body;
		doc._id = doc.id;
		delete doc.id;
		doc.history = u.map(doc.history, function(h) { // update all the hashes
			h.hash = crypto.createHash('md5').update(h.email).digest("hex");
			return h;
		});
		db.insert(doc, doc._id, function(err, body) {
			if (!err) {
				res.send({ _rev: body.rev, history: doc.history });
			} else { re.send({ status: 'error', body: 'an error occured with the update' }); }
		});	
	} else { res.send({ status:'error', body: 'not all of the necessary information was provided' }); }
});


// START THE SERVER
app.listen(port);
console.log('app running on port', port);