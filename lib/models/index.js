var db = function () {
  var models = {
    Volume: require('./volume')(),
    User: require('./user')()
  };
  return models;
};
exports.db = db;