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
var redditController = require('./server/controllers/redditPhotos.js');
var nasaController = require('./server/controllers/nasaPhotos.js');

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

const request = require('request');
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.second = 10;

var job = schedule.scheduleJob(rule, function(){
	var test = require('./server/controllers/nasaPhotos.js');
});

const redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?'