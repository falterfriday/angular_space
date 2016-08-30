var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"],
    trim: true,
    minlength: [2, "too short"]
  },
  id: {
    type: String
  }
}, {timestamps:true});



var User = mongoose.model('User', UserSchema);
