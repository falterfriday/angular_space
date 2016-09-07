var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//need to pull the userID into favorite
// query favorites with ID and see if the URL already exists
var FavoriteSchema = new mongoose.Schema({
  url: {
    type: String,
    unique:true,
  },
  hdUrl: {
    type: String
  },
  title: {
    type:String
  },
  date_posted: {
    type: Date
  },
  photographer: {
    type:String
  }
}, {timestamps: true});

var Favorite = mongoose.model('Favorite', FavoriteSchema);
