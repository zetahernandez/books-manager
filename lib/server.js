

  /**
   * Module dependencies.
   */

  var express = require('express'),
    http = require('http'),
    path = require('path'),
    api = require('./resources'),
    conf = require('./conf'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    socket = require('./socket'),
    domain_error = require('./middelware/domain-error'),
    sessionStore,

    app = express();
  //connect to db
    console.log(conf);
  // development only
  app.configure('development', function() {
    app.use(express.static(path.join(__dirname, '../public/app')));
    app.use(express.static(path.join(__dirname, '../public/.tmp')));
    console.log('create file session sessionStore');
    // var FileStore = require('connect-session-file');
    // sessionStore = new FileStore({
    //   maxAge: 10000
    // });
    var MongoStore = require('connect-mongo')(express);
    sessionStore = new MongoStore({
      url: conf.commons.dbPath,
      maxAge: 10000
    });
  });

  // production only
  app.configure('production', function() {
    app.use(express.static(path.join(__dirname, '../public/dist')));
    var MongoStore = require('connect-mongo')(express);
    sessionStore = new MongoStore({
      url: conf.commons.dbPath,
      maxAge: 10000
    });
  });
  // all environments
  app.configure(function() {
    app.use(domain_error);
    app.set('port', process.env.PORT || 9000);
    app.disable('strict routing');
    app.use(express.cookieParser());
    app.use(express.session({
      store: sessionStore,
      secret: 'zetasecret',
      key: 'express.sid'
    }));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.errorHandler());
    var root = path.normalize(__dirname + '/..');
    console.log(root);
    app.set('views', root + '/lib/views');


  });

  // bootstrap passport conf
  require('./config/passaport')(passport, conf);

  //Map routes here
  app = api.base.mapRoutes(app);
  app = api.auth.mapRoutes(app);
  app = api.volumes.mapRoutes(app);
  app = api.categories.mapRoutes(app);


  var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
  });

  socket.initialize(server, express, sessionStore);
  mongoose.connect(conf.commons.dbPath, function onMongooseError(err) {
    if (err) {
      console.log("ERROR MONGO: " + err);
    }
  });