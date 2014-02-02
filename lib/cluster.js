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
  require('./server');
}