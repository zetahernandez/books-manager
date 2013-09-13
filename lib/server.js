/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  api = require('./resources');

var app = express();

// all environments
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.disable('strict routing');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(app.router);

  app.use(express.errorHandler());
});

// development only
app.configure('development', function () {
  app.use(express.static(path.join(__dirname, '../public/app')));
  app.use(express.static(path.join(__dirname, '../public/.tmp')));
});

// production only
app.configure('production', function () {
  app.use(express.static(path.join(__dirname, '../public/dist')));
});

app = api.base.mapRoutes(app);
app = api.volumes.mapRoutes(app);
app = api.categories.mapRoutes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});