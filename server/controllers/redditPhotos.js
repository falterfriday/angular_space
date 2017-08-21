var mongoose = require('mongoose');
const request = require('request');

module.exports = new RedditPhotosController();

const redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?'

function RedditPhotosController(){
    request(nasaApiUrl, function(error, response, body){
		if(!error && response.statusCode == 200){
			const redditResponse = JSON.parse(body);
			return redditResponse;
		} else {
			console.log("Got an error: ", error, ", status code: ", response.statusCode)
		}
	})
};