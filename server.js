const express = require("express");
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
var http = require("http");

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.json());

//registers an user
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});

//login an user
app.post('/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
})

//*****  API CALLS *****

//test endpoint
app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });

app.get('/api/quizzes/:teacherID', function(req, res) {

	//connect to mongoDB, get quizzes based on teacher ID
    res.send(req.params);

  });

//***** REACT FILES *****

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
