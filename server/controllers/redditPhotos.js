var mongoose = require('mongoose');
var request = require('request');

var redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?';

function RedditPhotosController(){
    request(redditApiUrl, function(error, response, body){
		if(!error && response.statusCode == 200){
			const redditResponse = JSON.parse(body);
			return redditResponse;
		} else {
			console.log("Got an error: ", error, ", status code: ", response.statusCode)
		}
	})
};

module.exports = new RedditPhotosController();

function getRedditPhotos(){
        var returnedDataArr = [];
        $http.get('https://www.reddit.com/r/spaceporn/.json?')
        .then(function(returnedData){
            for (var x = 0; x <= 24; x++){
                returnedDataArr.push(returnedData.data.data.children[x]);
            }
        });
        return returnedDataArr;
    }