var port = process.env.PORT || 5000;

var express = require('express');
var app = express.createServer();

var server = require('nano')('https://app8736785.heroku.cloudant.com');
var db = server.use('app8736785.heroku/test01');

app.get('/', function(req, res) {
	
	//var result = server + ' - ' + db + ' - ';
	res.send(JSON.stringify(process));
	
});

app.listen(port);
//console.log('Listening on port', port);
//console.log('process', process);