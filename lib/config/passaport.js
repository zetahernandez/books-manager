var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  // GitHubStrategy = require('passport-github').Strategy,
  //GoogleStrategy = require('passport-google').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy,
  // LinkedinStrategy = require('passport-linkedin').Strategy,
  config = require('../conf'),
  User = mongoose.model('User');

module.exports = function(passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, function(err, user) {
      done(err, user);
    });
  });

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {

        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
        return done(null, user);
      });
    }
  ));
  // use google strategy
  passport.use(new GoogleStrategy({
      clientID: config.commons.google.clientID,
      clientSecret: config.commons.google.clientSecret,
      callbackURL: config.commons.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            authToken: accessToken,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));

  // // use facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.commons.facebook.clientID,
      clientSecret: config.commons.facebook.clientSecret,
      callbackURL: config.commons.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            authToken: accessToken,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
  
  passport.use(new DropboxOAuth2Strategy({
      clientID: config.commons.dropbox.clientID,
      clientSecret: config.commons.dropbox.clientSecret,
      callbackURL: config.commons.dropbox.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'dropbox.uid': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.displayName,
            authToken: accessToken,
            email: profile.emails[0].value,
            username: profile.emails[0].value,
            provider: 'dropbox',
            dropbox: profile._json
          });
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
// // use twitter strategy
  // passport.use(new TwitterStrategy({
  //     consumerKey: config.twitter.clientID,
  //     consumerSecret: config.twitter.clientSecret,
  //     callbackURL: config.twitter.callbackURL
  //   },
  //   function (token, tokenSecret, profile, done) {
  //     User.findOne({
  //       'twitter.id': profile.id
  //     }, function (err, user) {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (!user) {
  //         user = new User({
  //           name: profile.displayName,
  //           username: profile.username,
  //           provider: 'twitter',
  //           twitter: profile._json
  //         });
  //         user.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           }
  //           return done(err, user);
  //         });
  //       } else {
  //         return done(err, user);
  //       }
  //     });
  //   }
  // ));
  // // use github strategy
  // passport.use(new GitHubStrategy({
  //     clientID: config.github.clientID,
  //     clientSecret: config.github.clientSecret,
  //     callbackURL: config.github.callbackURL
  //   },
  //   function (accessToken, refreshToken, profile, done) {
  //     User.findOne({
  //       'github.id': profile.id
  //     }, function (err, user) {
  //       if (!user) {
  //         user = new User({
  //           name: profile.displayName,
  //           email: profile.emails[0].value,
  //           username: profile.username,
  //           provider: 'github',
  //           github: profile._json
  //         });
  //         user.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           }
  //           return done(err, user);
  //         });
  //       } else {
  //         return done(err, user);
  //       }
  //     });
  //   }
  // ));

  // // use linkedin strategy
  // passport.use(new LinkedinStrategy({
  //     consumerKey: config.linkedin.clientID,
  //     consumerSecret: config.linkedin.clientSecret,
  //     callbackURL: config.linkedin.callbackURL,
  //     profileFields: ['id', 'first-name', 'last-name', 'email-address']
  //   },
  //   function (accessToken, refreshToken, profile, done) {
  //     User.findOne({
  //       'linkedin.id': profile.id
  //     }, function (err, user) {
  //       if (!user) {
  //         user = new User({
  //           name: profile.displayName,
  //           email: profile.emails[0].value,
  //           username: profile.emails[0].value,
  //           provider: 'linkedin'
  //         });
  //         user.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           }
  //           return done(err, user);
  //         });
  //       } else {
  //         return done(err, user);
  //       }
  //     });
  //   }
  // ));
};