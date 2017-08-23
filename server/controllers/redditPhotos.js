var mongoose = require('mongoose');
var request = require('request');

const redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?';

function RedditPhotosController(){
    var returnedDataArr = [];
    request(redditApiUrl, function(error, response, body){
        if(!error && response.statusCode == 200){
            const redditResponse = JSON.parse(body);
            for (var x = 0; x <= 1; x++){
                returnedDataArr.push(redditResponse.data.children[x]);
            }  
        } else {
            console.log(`Got and error: ${error} \nStatus code: ${response.statusCode}`);
        }
    });
    console.log("I'm in the redditPhotos controller");
    return returnedDataArr
}
module.exports = new RedditPhotosController();