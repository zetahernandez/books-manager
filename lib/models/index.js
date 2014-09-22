var db = function () {
  var models = {
    Volume: require('./volume')(),
    User: require('./user')(),
    Upload: require('./upload')()
  };
  return models;
};
exports.db = db;