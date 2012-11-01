var port = process.env.PORT || 5000;

var express = require('express');
var app = express.createServer();

var server = require('nano')(process.env.CLOUDANT_URL);
var db = server.use('test01');

app.get('/', function(req, res) {
	
	//var result = server + ' - ' + db + ' - ';
	//res.send(JSON.stringify(server));
	
	nano.db.list(function(err, body) {
		res.send(JSON.stringify(body));
	});
	
});

app.listen(port);
//console.log('Listening on port', port);
//console.log('process', process);