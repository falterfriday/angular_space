var mongoose = require('mongoose');
var request = require('request');

function NasaPhotosController(){
    var returnedDataArr = [];
    var nasaApiUrl;
    var date;

    for (var x = 1; x <= 2; x++){
        date = (new Date( new Date() - 1000*60*60*24* x )
        .toISOString())
        .substring(0,10);            
        nasaApiUrl = 'https://api.nasa.gov/planetary/apod?hd=True&date=' + date + '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB';
        request(nasaApiUrl, function(error, response, body){
            if(!error && response.statusCode == 200){
                const nasaResponse = JSON.parse(body);
                returnedDataArr.push(nasaResponse);
            } else {
                console.log(`Got and error: ${error} \nStatus code: ${response.statusCode}`)
            }
        })
    }
    return returnedDataArr;
}
module.exports = new NasaPhotosController();
