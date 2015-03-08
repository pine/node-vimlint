'use strict';

var exec = require('child_process').exec;
var path = require('path');

module.exports = function (file, done) {
  var vimlint = path.join(__dirname, '../vim-vimlint');
  var vimlint_bin = path.join(vimlint, 'bin/vimlint.sh');
  var vimlparser = path.join(__dirname, '../vim-vimlparser');
  
  var cmd = 'sh ' + vimlint_bin+ ' -l ' +
    vimlint + ' -p ' + vimlparser + ' -v ' + file;
  
  exec(cmd, function (err, stdout, stderr) {
    done(err, stdout, stderr);
  });
};