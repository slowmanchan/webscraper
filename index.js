var request = require('request');
var cheerio = require('cheerio');
var count = 1100;
var options = {
	url: 'http://www.metacritic.com/browse/movies/title/dvd?page=' + count,
	headers: {
		'User-Agent': 'Mozilla Firefox'
	}
};

var scores = [];
var titles = [];
var metaData = [];
var scoresTitles = {};
var page = true;


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
		//console.log(metaData);
		if ($('div[class=pad_top1]').text().trim() == 'No movies found.') {
			page = false;

		}
		
	})
console.log(page)
	count++;
