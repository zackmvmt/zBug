var express = require('express');

var app = express.createServer();

var restler = require('restler');
// figure out how to connect to cloudant

app.get('/', function(req, res) {
	
	var result = '' + process;
	
	console.log('test');
	
	res.send(result);
	
});

var port = process.env.PORT || 5000;

app.listen(port);