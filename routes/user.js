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
    console.log('we serialized a user:' + user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('we\'ll deserialze a user:' + user);
      done(err, user);
    });
  });
};



handlers.loginForm = function(req, res) {
  res.render('user/loginForm')
};

module.exports = handlers;