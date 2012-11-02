var port = process.env.PORT || 5000;

var express = require('express');
var app = express.createServer();

/*
var server = require('nano')(process.env.CLOUDANT_URL);
var db = server.use('test01');

app.get('/', function(req, res) {
	
	//res.send(JSON.stringify(server));
	
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
*/
app.get('/', function(req, res) {
	res.send(process.env.PORT ? 'on heroku' : 'on localhost');
});

app.listen(port);