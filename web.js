var express = require('express');

var app = express.createServer();

var restler = require('restler');
// figure out how to connect to cloudant

app.get('/', function(req, res) {
	
	res.send('Hello World');
	
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port', port);
//console.log('process?', process);