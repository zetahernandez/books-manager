var passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

function mapRoutes(app) {
  app.post('/api/auth/signIn', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.json(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post('/api/auth/signUp', function(req, res) {

    var user = new User(req.body);

    user.provider = 'local';

    user.save(function(err, user) {
      console.log(err);
      if (err) {
        return res.json(err);
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.json(err);
        }
        return res.json(user);
      });
    });
  });

  app.get('/api/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  app.get('/api/auth/google/return', passport.authenticate('google', {
    successRedirect: '/api/auth/succes',
    failureRedirect: '/api/auth/fail'
  }));

  app.get('/api/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  app.get('/api/auth/facebook/return', passport.authenticate('facebook', {
    successRedirect: '/api/auth/succes',
    failureRedirect: '/api/auth/fail'
  }));

  app.get('/api/auth/succes', function(req, res) {
    res.render('complete.ejs', {
      state: 'success',
      user: req.user ? req.user : null
    });
  });
  //TODO: 
  app.get('/api/auth/fail', function(req, res) {
    res.render('lala', {
      state: 'failure',
      user: null
    });
  });

  return app;
}
module.exports.mapRoutes = mapRoutes;