/* jshint esversion: 6 */
var mongoose = require('mongoose'),
	express = require('express'),
	bodyparser = require('body-parser'),
	path = require('path'), root=__dirname,
	port = process.env.PORT || 8000,
	app = express();
app.use(bodyparser.json());
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
	console.log(`running on port ${port}`);
});


//EXPERIMENTAL
var ignoredPaths = ['/nasa', '/reddit', '/profile/:id'];

app.all('/*', function(req, res, next) {
  if(!startsWith(req.url, ignoredPaths))
    res.sendFile('index.html', { root: __dirname });
  else
    next();
});

function startsWith(string, array) {
  for(i = 0; i < array.length; i++)
    if(string.startsWith(array[i]))
      return true;
  return false;
}


var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 10;
var test = schedule.scheduleJob(rule, function(){
	request(redditApiUrl, function(error, response, body){
		if(!error && response.statusCode == 200){
			const redditResponse = JSON.parse(body);
			console.log(redditResponse);
		} else{
			console.log("Got an error: ", error, ", status code: ", response.statusCode)
		}
	})
});

const request = require('request');

const redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?'

function getRedditPhotos(){
	request(redditApiUrl, function(error, response, body){
		if(!error && response.statusCode == 200){
			const redditResponse = JSON.parse(body);
			return redditResponse;
		} else{
			console.log("Got an error: ", error, ", status code: ", response.statusCode)
		}
	})
}


