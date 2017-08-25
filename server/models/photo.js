const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this is where the json is formatted and pushed to db

module.exports = {
    redditPhoto: function(jsonArr){
        for(let i  = 0; i < jsonArr.length; i++){
            photoJson.url = jsonArr.url;
            photoJson.description = jsonArr.description
        }
        console.log("in the photo.js file")
        console.log(photoJson.url);
    } 
}

let photoJson = {
    "url": String,
    "description": String
}

let PhotoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps:true});

const Photo = mongoose.model('Photo', PhotoSchema);