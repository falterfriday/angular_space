const mongoose = require('mongoose');
const request = require('request');
const photoCleaner = require("../models/photo.js");
const Photo = mongoose.model('Photo')

const redditApiUrl = 'https://www.reddit.com/r/spaceporn/.json?';

module.exports = {
    getRedditPhotos: function(){
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
        //console.log("I'm in the redditPhotos controller");
        //console.log(returnedDataArr);
        //return returnedDataArr
        photoCleaner.redditPhoto(returnedDataArr);
    }
};

function PhotoController(){
    this.addPhoto = function(req,res){
        let photo = Photo({
            url:returnedDataArr.children.data.url,
            description:returnedDataArr.children.data.title
        });
        photo.save(function(err){
            if(err){
                res.json(err);
            } else {
                res.json(photo)
            }
        });
    }
}

module.exports = new PhotoController();