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
    passport.authenticate('local', function(err, user, info) {
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
 
/**
 * Sails controllers expose some logic automatically via blueprints.
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for AuthController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 */
 
module.exports.blueprints = {
 
  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,
 
  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,
 
  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true
 
};

