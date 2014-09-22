var os = require('os'),
	path = require('path');


module.exports.tmpDir = function(user) {
	return os.tmpdir()  + 'user_' + user.id + path.sep;
};