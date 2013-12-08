var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var handlers = {}


handlers.initPassport = function(passport) {
  // passport initialization
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username}, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }

        user.comparePassword(password, function(err, isMatch) {
          if (err) return done(err);

          if (!isMatch)
            return done(null, false, {
              message: 'Incorrect password.'
            });

          return done(null, user);
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};



module.exports = handlers;