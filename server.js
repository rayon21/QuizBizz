const express = require("express");
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
var http = require("http");

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user');
var {Quiz} = require('./models/quiz');
var {authenticate} = require('./middleware/authenticate');
const {ObjectID} = require('mongodb');

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '919745745086-u1k3o9ibi1tmvlcdvjc5mpud98f0thus.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

var app = express();
const port = process.env.PORT || 5622;

//middleware used to extract body of post request
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.redirect(401, '/login');
    res.end();
  }
});

//*****  USER API *****//

//registers an user
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
    console.log(e);
		res.status(400).send(e);
	})
});

//login an user
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
})

//logout
app.delete('/users/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
})

//*****  GOOGLE OAUTH API *****//
app.post('/users/auth/google', async (req, res) => {
  var body = _.pick(req.body, ['tokenId', 'accessToken'])
  const ticket = client.verifyIdToken({
    idToken: body.tokenId,
    audience: CLIENT_ID
  }).then((ticket) => {
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    //check if user already exists
    User.findOne({email: payload.email}).then((user) => {
      if (!user) {
        var user = new User({email: payload.email, password: null});
        user.save().then(() => {
          return user.generateAuthToken();
        }).then(token => {
          res.header('x-auth', token).send({user});
        })
      } else {
        // user already exists, just login
        user.generateAuthToken().then(token => {
          res.header('x-auth', token).send({user});
        })
      }
    })
  }).catch(err => {
    console.log(err);
    res.status(400).send();
  })
})


//*****  QUIZ CALLS *****//

// call to save quiz, user must be logged in
app.post('/api/quizzes', authenticate, (req, res) => {
  var quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    participants: req.body.participants,
    questions: req.body.questions,
    _creator: req.user._id
  });

  quiz.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// gets all quizzes based on the user that is logged in
app.get('/api/quizzes', authenticate, (req, res) => {
  Quiz.find({
    _creator: req.user._id
  }).then((quizzes) => {
    res.send({quizzes});
  }, (e) => {
    res.status(400).send(e);
  });
});

// gets the quiz with the mathcing id (Every Quiz has an _id)
app.get('/api/quizzes/:id', authenticate, (req, res) => {
  var id = req.params.id;
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Quiz.findOne({
    _id: id,
    _creator: req.user._id
  }).then((quiz) => {
    if (!quiz) {
      return res.status(404).send();
    }

    res.send({quiz});
  }).catch((e) => {
    res.status(400).send();
  });
});

// deletes the quiz based on the _id
app.delete('/api/quizzes/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Quiz.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((quiz) => {
    if (!quiz) {
      return res.status(404).send();
    }

    res.send({quiz});
  }).catch((e) => {
    res.status(400).send();
  });
});

// updates the quiz based on the quiz _id
app.patch('/api/quizzes/:id', authenticate, (req, res) => {
  console.log("PATCHED");
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'completed', 'participants','questions']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    // setting todays date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    body.completedAt = mm + '/' + dd + '/' + yyyy;
    // body.completedAt = new Date().getTime();

  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Quiz.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((quiz) => {
    if (!quiz) {
      return res.status(404).send();
    }

    res.send({quiz});

  }).catch((e) => {
    res.status(400).send();
  });

});


//***** REACT FILES *****

// Serve static files from the React app

app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


var server = app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

var quizzes = require('./models/QuizGame');

// SOCKET


var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log('client connected');
    quizzes.initQuizzes(io, socket);
});


/* for testing */
module.exports = app;






