var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MoviesSchema = Schema(
  {
    title: {type: String, required: true, max: 100},
    score: {type: String, required: true, max: 100},
  }
)


module.exports.MoviesSchema = MoviesSchema;
