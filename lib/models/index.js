var db = function () {
  var mongoose = require('mongoose'),
    dbPath = 'mongodb://zeta:123456@ds043398.mongolab.com:43398/books';

  mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) {
      throw err;
    }
  });

  var models = {
    Volume: require('./volume')(mongoose)
  };
  return models;
};
exports.db = db;