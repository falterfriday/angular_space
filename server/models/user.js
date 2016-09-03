var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var validateEmail = function(email){
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "name required"],
    trim: true,
    minlength: [2, "too short"]
  },
  last_name: {
    type: String,
    required: [true, "name required"],
    trim: true,
    minlength: [2, "too short"]
  },
  email: {
    type: String,
    unique:true,
    lowercase: true,
    required: [true, "email required"],
    validate: [validateEmail, "invalid email"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"]
  },
  password: {
    type:String,
    required: [true, "password required"],
    minlength: [8, "password too short"],
    maxlength: [32, "password too long"],
    validate: {
      validator: function(value){
        var pattern = new RegExp(value);
        return pattern.test(this.pw_conf);
      },
      message: "passwords must match"
    }
  },
  pw_conf: {
    type: String,
    required: [true, "confirmation required"]
  },
  _favorites: [{
    type: Schema.Types.ObjectId, ref: 'Favorite'
  }]
}, {timestamps:true});

UserSchema.pre('save', function(done){
  if(!this.isNew){
    return done();
  }
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  this.pw_conf = '';
  done();
});

var User = mongoose.model('User', UserSchema);
