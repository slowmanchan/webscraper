var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MoviesSchema = Schema(
  {
    title: {type: String, required: true, max: 100},
    score: {type: String, required: true, max: 100},
  }
);

MoviesSchema
  .virtual('url')
  .get(function() {
    return '/movies' + this._id;
  })


module.exports = mongoose.model('Movies', MoviesSchema)
