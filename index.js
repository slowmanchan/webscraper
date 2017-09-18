var request = require('request');
var cheerio = require('cheerio');
var options = {
	url: 'http://www.metacritic.com/browse/movies/title/dvd',
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
		metaData.push(scoresTitles);
	}
	console.log(metaData);
	
	
})

