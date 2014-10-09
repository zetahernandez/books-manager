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
    identifier: { type: String, index: true },
    fname: String,
    ftype: String,
    fsize: Number,
    uploaded: {
      type: Date,
      default: Date.now
    },
    path: String
  });

  return mongoose.model('Upload', UploadSchema);
};