var io = require('socket.io'),

	dropbox = require('dropbox');

exports.initialize = function(server) {
	io = io.listen(server);
	io.sockets.on("connection", function(socket) {
		socket.send(JSON.stringify({
			type: 'serverMessage',
			message: 'Welcome to the most interesting chat room on earth!'
		}));
		socket.on('identificate', function(message, fn) {
			// message = JSON.parse(message);
			// if (message.type === "userMessage") {
			socket.broadcast.send(fn(JSON.stringify(message)));
			// message.type = "myMessage";
			socket.send(fn(JSON.stringify(message)));
			// }
		});
	});
};