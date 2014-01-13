var os = require('os'),
	path = require('path');


module.exports.tmpDir = function(user) {
	return os.tmpdir() + path.sep + 'user_' + user.id;
};