var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Favorite = mongoose.model('Favorite');

function UserController(){
  this.createUser = function(req,res){
    var user = User({
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      password:req.body.password,
      pw_conf:req.body.pw_conf
    });
    // console.log("users.js = ", user);
    user.save(function(err){
      if(err){
        // console.log('new user not added');
        res.json(err);
      }
      else {
        res.json(user);
      }
    });
  };
  this.loginUser = function(req,res){
    User.findOne({email:req.body.email.toLowerCase()}, function(err, user){
      if(err){
        res.json(err);
      } else {
        if(user === null){
          res.json({error:"invalid login credentials"});
        } else {
          if(bcrypt.compareSync(req.body.password, user.password)){
            // console.log("user data = ", user);
            res.json(user);
          } else {
            res.json({error: "incorrect password"});
          }
        }
      }
    });
  };
  this.addNasaFavorite = function(req,res){
    User.findOne({_id:req.body.userId}, function(err, user){
      var favorite = Favorite({
        url:req.body.url,
        hdUrl:req.body.hdurl,
        title:req.body.title,
        date_posted:req.body.date,
        photographer:req.body.copyright,
      });
      user._favorites.push(favorite);
      favorite.save(function(err){
        if(err){
          // console.log('problem saving favorite');
        } else {
          user.save({validateBeforeSave:false}, function(err){
            if(err){
              res.json(err);
            } else {
              // console.log('favorite successfully saved');
              res.json(favorite);
            }
          });
        }
      });
    });
  };
  this.addRedditFavorite = function(req,res){
    User.findOne({_id:req.body.userId}, function(err, user){
      var favorite = Favorite({
        url:req.body.url,
        hdUrl:req.body.preview.images[0].source.url,
        title:req.body.title,
        date_posted:req.body.created_utc,
      });
      console.log('favorite = ', favorite);
      user._favorites.push(favorite);
      favorite.save(function(err){
        if(err){
          // console.log('problem saving favorite');
        } else {
          user.save({validateBeforeSave:false}, function(err){
            if(err){
              res.json(err);
            } else {
              // console.log('favorite successfully saved');
              res.json(favorite);
            }
          });
        }
      });
    });
  };
  this.getUserInfo = function(req,res){
    User.find({_id:req.body.id}, function(err, user){
      if(err){
        // console.log("error retrieving user");
        res.json(err);
      } else {
        res.json(user);
      }
    });
  };
  this.getFavUrls = function(req,res){
    console.log(req.body);
    User.find({_id:req.body.id}).populate('_favorites').exec(function(err, favorites){
      if(err){
        res.json(err);
      } else {
        res.json(favorites);
      }
    });
  };
  this.getUserFavorites = function(req,res){
    console.log(req.body);
    User.find({_id:req.body.id}).populate('_favorites').exec(function(err, favorites){
      if(err){
        // console.log('error retrieving favorites');
        res.json(err);
      } else {
        // console.log('favorites retrieved');
        res.json(favorites);
      }
    });
  };
  this.deleteFavorite = function(req, res){
    if (!req.body._id){
      // console.log("wakka wakka", req.body.url);
      favorite = Favorite.find({url:req.body.url});
      console.log("favorite = ", favorite);
      favorite.remove(function(err, favorite){
        if(err){
          res.json(err);
        } else {
          res.json(favorite);
        }
      });
    } else {
      favorite = Favorite.find({_id:req.body._id});
      favorite.remove(function(err, favorite){
        if(err){
          // console.log("error deleting favorite");
          res.json(err);
        } else {
          // console.log("successfully deleted favorite");
          res.json(favorite);
        }
      });
    }
  };
}
module.exports = new UserController();
