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

var app = express();
const port = process.env.PORT || 8888;

//middleware used to extract body of post request
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

//logout
app.delete('/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
})


//*****  QUIZ CALLS *****

// cal to save quiz, user must be logged in
app.post('/quizzes', authenticate, (req, res) => {
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
app.get('/quizzes', authenticate, (req, res) => {
  Quiz.find({
    _creator: req.user._id
  }).then((quizzes) => {
    res.send({quizzes});
  }, (e) => {
    res.status(400).send(e);
  });
});

// gets the quiz with the mathcing id (Every Quiz has an _id)
app.get('/quizzes/:id', authenticate, (req, res) => {
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
app.delete('/quizzes/:id', authenticate, (req, res) => {
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
app.patch('/quizzes/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
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
  })
});


//*****  API CALLS *****

//test endpoint
// app.get('/api/:version', function(req, res) {
//     res.send("ASS");
//   });

// app.get('/api/quizzes/:teacherID', function(req, res) {

// 	//connect to mongoDB, get quizzes based on teacher ID
//     res.send(req.params);

//   });

//***** REACT FILES *****

// Serve static files from the React app

// app.use(express.static(path.join(__dirname, 'client/build')));

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
