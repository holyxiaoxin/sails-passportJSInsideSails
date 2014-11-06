var passport = require('passport');

module.exports = function (req, res, next) {
  // User is allowed, proceed to controller
  passport.authenticate('basic', {session: false}, function(err, user, info) {
    if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        console.log("success");
        next();
      });
    })(req, res);
};