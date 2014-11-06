//  Authentication Process:
//  1. Try to authenticate via passport-http Basic Strategy using the following form:
//
//  GET /user/ HTTP/1.1
//  Host: nodejs-160326.apse1.nitrousbox.com:1337
//  Authorization: Basic username:passwordBothEncodedInBase64
//  Cache-Control: no-cache (this field is not important)
//
//  2. If authentication via passport-http fails,
//  try to authenticate via passport-local,
//  client will be redirected to login page

var passport = require('passport');

module.exports = function (req, res, next) {
  
  if(req.get('authorization')){
    passport.authenticate('basic', {session: false}, function(err, user, info) {
      if ((err) || (!user)) {
        return res.json(
          {'status':0,
           'message':'incorrect username or password'}
        );
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        next();
      });
    })(req, res);
  }else{
    var is_auth = req.isAuthenticated()
    if (is_auth) return next();
    // User is not allowed
    else return res.redirect("/user/login");
  }
    
  
  
  
  
};