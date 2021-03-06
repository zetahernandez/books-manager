var io = require('socket.io'),
  passportSocketIo = require('passport.socketio'),
  userUtil = require('./util/user'),
  fs = require('fs'),
  path = require('path'),
  // dbox = require('dbox'),
  config = require('./conf');

var onAuthorizeSuccess = function(data, accept) {
  console.log('successful connection to socket.io');

  // The accept-callback still allows us to decide whether to
  // accept the connection or not.
  accept(null, true);
};

var onAuthorizeFail = function(data, message, error, accept) {
  if (error) {
    throw new Error(message);
  }
  console.log('failed connection to socket.io:', message);

  // We use this callback to log all of our failed connections.
  accept(null, false);
};

exports.initialize = function(server, express, sessionStore) {
  io = io.listen(server);
  io.configure(function() {
    // io.set('log level', 1);

    // set authorization for socket.io
    io.set('authorization', passportSocketIo.authorize({
      cookieParser: express.cookieParser,
      key: 'express.sid', // the name of the cookie where express/connect stores its session_id
      secret: 'zetasecret', // the session_secret to parse the cookie
      store: sessionStore, // we NEED to use a sessionstore. no memorystore please
      success: onAuthorizeSuccess, // *optional* callback on success - read more below
      fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
    }));
  });

  io.sockets.on("connection", function(socket) {
    // socket.send("session in socket: " + JSON.stringify(socket.handshake.user));

    // socket.send(JSON.stringify({
    //  type: 'serverMessage',
    //  message: 'Welcome to the most interesting chat room on earth!'
    // }));
    // socket.on('identificate', function(uuid, fn) {
    //   var user = socket.handshake.user,
    //     userTmpDir = userUtil.tmpDir(user),
    //     dbox = require("dbox"),
    //     app = dbox.app({
    //       "app_key": config.commons.dropbox.clientID,
    //       "app_secret": config.commons.dropbox.clientSecret
    //     }),

    //     client = app.client(user.authToken);

    //   client.account(function(status, reply) {
    //     console.log(reply);
    //     fs.readFile(userTmpDir + path.sep + uuid, function(error, data) {
    //       // No encoding passed, readFile produces a Buffer instance
    //       if (error) {
    //         console.log("Error reading file for uploading!");
    //         socket.send(JSON.stringify({
    //           type: 'serverMessage',
    //           message: 'Error reading file for uploading!'
    //         }));
    //       }
    //       client.put(uuid, data, function(error, stat) {
    //         if (error) {
    //           console.log("uploading");
    //           socket.send(JSON.stringify({
    //             type: 'serverMessage',
    //             message: stat
    //           }));
    //         }
    //         // The image has been succesfully written.
    //       });
    //     });
    //   });


    // });
  });
};