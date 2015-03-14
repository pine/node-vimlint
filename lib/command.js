'use strict';
/*jshint node: true */

var commander = require('commander');

var pkg = require('../package.json');
var vimlint = require('./vimlint');


var lintFile = exports.lintFile = function (file, cb) {
  vimlint(file, function (err, stdout, stderr) {
    cb(err);
  });
};

exports.lintFiles = function (files, cb) {
  var runs = 0;
  var errs = [];
  
  function F(err) {
    if (err) { errs.push(err); }
    if (++runs === files.length) {
      cb(errs.length > 0 ? errs : null);
    }
  }
  
  for (var i = 0; i < files.length; ++i) {
    lintFile(files[i], F);
  }
};

exports.parser =
  commander
    .version(pkg.version)
    .usage('<file ...>');