const express = require("express");
const _ = require('lodash');
var http = require("http");

var app = express();
const port = process.env.PORT || 8888;

function onRequest(request, response) {
	response.writeHead(200, {"Context-Type": "text/plain"});
	response.write("Hello Brogrammers");
	response.end();
}

// app.post('/users', (req, res) => {
// 	var body = _.pick(req.body, ['email', 'password']);
// 	var user = new User(body);
// })

//endpoint test
app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
