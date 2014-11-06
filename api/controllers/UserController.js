/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
module.exports = {
 
  register: function(req,res){
    res.view();
  },
  
  create: function(req,res,next){
    
    var username = req.param('username'),
        password = req.param('password'),
        email = req.param('email');
    
    if(!username||!password){
      return res.send({
        message : 'username or password cannot be empty'
      })
    }
    
    User.create({
      username : username,
      email : email,
      password : password
    },function( err, user ){
      if(err){
        if (err.code === 'E_VALIDATION') {
          if (err.invalidAttributes.email) {
            return res.badRequest(err);
          } else {
            return res.badRequest(err);
          }
        }
      }
      return res.redirect('/user/show/' + user.id);
    });
    
  },
                
  show: function(req, res) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err || !user) return res.serverError(err);
      res.view({user: user});
    });
  },
  
  login: function (req, res) {
    res.view();
  },
  
  process: function(req, res){
    passport.authenticate( ['local'] , function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.redirect("/user/show/"+user.id);
      });
    })(req, res);
  },
  
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
};

