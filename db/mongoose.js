var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:3711/QuizzBizz');

module.exports = {
	mongoose
}
