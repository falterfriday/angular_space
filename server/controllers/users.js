var mongoose = require('mongoose');
var User = mongoose.model('User');


function UserController(){
  this.createUser = function(req,res){
    var user = User({
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      password:req.body.password,
      pw_conf:req.body.pw_conf
    });
    console.log("users.js = ", user);
    user.save(function(err){
      if(err){
        console.log('new user not added');
        res.json(err);
      }
      else {
        res.json(user);
      }
    });
  };
}
module.exports = new UserController();
