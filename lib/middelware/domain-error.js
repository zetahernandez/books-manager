var domain = require('domain');
module.exports = function(req, res, next) {
  var d = domain.create();
  d.on('error', function(er) {
    console.error('error', er.stack);

    // Note: we're in dangerous territory!
    // By definition, something unexpected occurred,
    // which we probably didn't want.
    // Anything can happen now!  Be very careful!

    try {
      // make sure we close down within 30 seconds
      var killtimer = setTimeout(function() {
        console.error('kill process');
        process.exit(1);
      }, 30000);
      // But don't keep the process open just for that!
      killtimer.unref();

      // stop taking new requests.
  //    server.close();

      // Let the master know we're dead.  This will trigger a
      // 'disconnect' in the cluster master, and then it will fork
      // a new worker.
    //  cluster.worker.disconnect();

      // try to send an error to the request that triggered the problem
      res.statusCode = 500;
      res.setHeader('content-type', 'text/plain');
      res.end('Oops, there was a problem!\n');
    } catch (er2) {
      // oh well, not much we can do at this point.
      console.error('Error sending 500!', er2.stack);
    }

    // Because req and res were created before this domain existed,
    // we need to explicitly add them.
    // See the explanation of implicit vs explicit binding below.
    d.add(req);
    d.add(res);

  });
  d.run(next) ; 
};