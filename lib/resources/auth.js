var passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

function mapRoutes(app) {
  app.post('/api/auth/signIn', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post('/api/auth/signUp', function (req, res) {

    var user = new User(req.body);

    user.provider = 'local';
    
    user.save(function (err, user) {
      console.log(err);
      if (err) {
        return res.json(err);
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json(err);
        }
        return res.json(user);
      });
    });
  });
  return app;
}
module.exports.mapRoutes = mapRoutes;