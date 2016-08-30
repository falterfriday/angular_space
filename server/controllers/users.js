var mongoose = require('mongoose');
var User = mongoose.model('User');


function UserController(){
  this.createUser = function(req,res){
    var user = User({name: req.body.name});
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
