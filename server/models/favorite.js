var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new mongoose.Schema({
  url: {
    type: String
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
  // _user: [{
  //   type: Schema.Types.ObjectId, ref: 'User'
  // }]
}, {timestamps: true});

var Favorite = mongoose.model('Favorite', FavoriteSchema);
