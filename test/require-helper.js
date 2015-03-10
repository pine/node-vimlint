'use strict';

var path = require('path');

module.exports = function (file) {
  var fullPath;
  
  if (process.env.APP_DIR_FOR_CODE_COVERAGE) {
    fullPath = path.join(process.env.APP_DIR_FOR_CODE_COVERAGE, file);
  }
  
  else {
    fullPath = path.join(__dirname, '../', file);
  }
  
  delete require.cache[require.resolve(fullPath)];
  return require(fullPath);
};
