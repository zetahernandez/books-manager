var pdf_extract = require('pdf-extract');
/**
 * search the isbn pattern
 * @param  String   text
 * @return array isbn
 */
module.exports.findISBN = function(text) {
  var result = text.match(new RegExp("ISBN(-1(?:(0)|3))?:?\x20(\s)*[0-9]+[- ][0-9]+[- ][0-9]+[- ][0-9]*[- ]*[xX0-9]"));
  if (result) {

  }
};