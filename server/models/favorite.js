const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FavoriteSchema = new mongoose.Schema({
  url: {
    type: String,
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

const Favorite = mongoose.model('Favorite', FavoriteSchema);
