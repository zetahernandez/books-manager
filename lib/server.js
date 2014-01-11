var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker %d died (%s). restarting...',
      worker.process.pid, signal || code);
    cluster.fork();
  });

  cluster.on('listening', function(worker, address) {
    console.log("A worker is now connected to " + address.address + ":" + address.port);
  });


} else {

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

    app = express();
  //connect to db
  mongoose.connect(conf.commons.dbPath, function onMongooseError(err) {
    if (err) {
      console.log("ERROR MONGO: " + err);
    }
  });
  // all environments
  app.configure(function() {
    app.use(domain_error);
    app.set('port', process.env.PORT || 9000);
    app.disable('strict routing');
    app.use(express.cookieParser());

    app.configure('development', function() {
      console.log('create file session store');

      var FileStore = require('connect-session-file');
      app.use(express.session({
        store: new FileStore({
          maxAge: 10000
        }),
        secret: 'zetasecret'
      }));
    });
    app.configure('production', function() {
      var MongoStore = require('connect-mongo')(express);
      app.use(express.session({
        secret: 'zetasecret',
        key: 'express.sid',
        store: new MongoStore({
          url: conf.commons.dbPath
        })
      }));
    });

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

  //app.set('env','production');
  // development only
  app.configure('development', function() {
    app.use(express.static(path.join(__dirname, '../public/app')));
    app.use(express.static(path.join(__dirname, '../public/.tmp')));
  });

  // production only
  app.configure('production', function() {
    app.use(express.static(path.join(__dirname, '../public/dist')));

  });
  //Map routes here
  app = api.base.mapRoutes(app);
  app = api.auth.mapRoutes(app);
  app = api.volumes.mapRoutes(app);
  app = api.categories.mapRoutes(app);
  app = api.dropbox.mapRoutes(app);


  server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
  });

  socket.initialize(server);
}