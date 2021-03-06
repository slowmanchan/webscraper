var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var Movies = require('./models/movies');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://zhazero:magicjedi@ds121190.mlab.com:21190/metacritic_test';

mongoose.connect(mongoDB, {
	useMongoClient: true
});

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'mongoDB connection error'));
db.once('open', function(callback) {
	console.log('Connection succeeded');
})

var page = 0;
var indexCount = 0;
var pageExists = true;
var indexExists = true;

async.whilst(
    function(){
		return (indexExists);
	},
	function(next){

		var letter = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var options = {
			url: 'http://www.metacritic.com/browse/movies/title/dvd/' + letter[indexCount] + '?page=' + page,
			headers: {
				'User-Agent': 'Mozilla Firefox'
			}
		};
		var scores = [];
		var titles = [];
		var metaData = [];
		var scoresTitles = {};


		request(options, function(err, res, html) {
			if(err) { console.log(err) }

			var $ = cheerio.load(html);
			console.log('status code:' + res.statusCode);
			console.log(res.headers);


			$('td.score_wrapper div.metascore_w').each(function(i, node) {
				scores.push($(this).text());
			})

			$('td.title_wrapper div.title a').each(function(i, node) {
				titles.push($(this).text());
			})

			for (i = 0; i < scores.length; i++) {
				scoresTitles = {
					score: scores[i],
					title: titles[i]
				}

				Movies.findOne({"title": titles[i]})
					.exec(function(err, item) {
						if (err) { console.log(err) };
						if (!item) {
							console.log('nothing found, creating')
							Movies.create(
								{
									title: titles[i],
									score: scores[i]
								}, function(err, createdItem) {
									if (err) {
										console.log(err)
										return null;
									}
								}
							)
						}
					})
				metaData.push(scoresTitles);


			}

			console.log(metaData);

			page++;

			if ($('div[class=pad_top1]').text().trim() == 'No movies found.') {
				page = 0;
				indexCount++;
			}

			if (indexCount > 26) {
				indexExists = false;
			}

			next();
		})


	},
	function(err) { console.log(err) }
)
