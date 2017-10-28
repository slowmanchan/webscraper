var mongoose = require('mongoose');
var Movies = require('./Models/Bugs');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback) {
  console.log('Connection Succeeded');
});

var Movies = mongoose.model('Movies', Movies.MoviesSchema);

module.exports.Movies = Movies;
