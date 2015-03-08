'use strict';

var path = require('path');

module.exports = function (file) {
  if (process.env.APP_DIR_FOR_CODE_COVERAGE) {
    return require(path.join(process.env.APP_DIR_FOR_CODE_COVERAGE, file));
  }
  
  return require(path.join(__dirname, '../', file));
};
