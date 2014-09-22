module.exports = function() {
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

  /**
   * [imageSchema description]
   * @type {Schema}
   */
  var UploadSchema = new Schema({
    user: {
      type: ObjectId,
      ref: 'User'
    },
    identifier: String,
    fname: String,
    ftype: String,
    fsize: Number,
    uploaded: {
      type: Date,
      default: Date.now
    },
    path: String
  });

  var Upload = mongoose.model('Upload', UploadSchema);

  /**
   * Add a new upload Save it in mongodb
   *
   * @param upload     upload
   * @param {Function} callback (err,result)
   */
  var add = function(upload, callback) {
    upload = new Upload(upload);
    upload.save(callback);
  };

  /**
   * List all uploads
   *
   * @param  {Function} callback (err,results)
   * @return {void}
   */
  var findAll = function(callback) {
    Upload.find(callback);
  };

  /**
   * Find a volume with id passed in the parameter
   *
   * @param  {String}   _id
   * @param  {Function} callback (err, volume)
   * @return {void}
   */
  var findById = function(_id, callback) {
    Upload.findOne({
      id: _id
    }, callback);
  };

  /**
   * [find description]
   * @param  {[type]}   criteria
   * @param  {Function} callback
   * @return {[type]}
   */
  var find = function(criteria, callback) {
    Upload.findOne(criteria, callback);
  };

  return {
    add: add,
    findAll: findAll,
    findById: findById,
    find: find,
    Upload: Upload
  };
};