var dev = process.env.PORT ? false : true;
var port = process.env.PORT || 5000;

var express = require('express');
var app = express.createServer();

var server = require('nano')(dev ? 'http://127.0.0.1:5984/' : process.env.CLOUDANT_URL);
var db = server.use('test01');

app.get('/', function(req, res) {
	
	var docs = [];
	
	db.list(function(err, body) {
		if (!err) {
			body.rows.forEach(function(doc) {
				docs.push(doc);
			});
			res.send(JSON.stringify(docs));
		}
	});
	
});

app.listen(port);