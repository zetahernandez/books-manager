var pdf_extract = require('pdf-extract');

module.exports.loadPDF = function(upload, callback) {
  var options = {
    type: 'text' // extract the actual text in the pdf file
  }
  var processor = pdf_extract(upload.path, options, function(err) {
    if (err) {
      return callback(err);
    }
  });
  processor.on('complete', function(data) {
    callback(null, data.text_pages);
  });
  processor.on('error', function(err) {
    return callback(err);
  });
};

module.exports.loadPDFByPage = function(upload, callback) {
  var options = {
    type: 'text' // extract the actual text in the pdf file
  }
  var processor = pdf_extract(upload.path, options, function(err) {
    if (err) {
      return callback(err);
    }
  });
  processor.on('page', function(data) {
    callback(null, data.text);
  });
  processor.on('error', function(err) {
    return callback(err);
  });
};