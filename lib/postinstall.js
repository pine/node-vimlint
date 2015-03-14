'use strict';

var exec = require('child_process').exec;
var fs = require('fs');

/**
 * rimraf を遅延読み込みで実行する関数
 * 引数と仕様は rimraf と同じ
 * postinstall の際に rimraf を require すると解決できないため、遅延させる
 */
var rimraf = exports.rimraf = (function() {
  var _rimraf;
  
  function load() {
    try {
      _rimraf = require('rimraf');
    }
    
    catch (e) {
      setTimeout(function () { load(); }, 100);
    }
  }
  
  load();
  
  return function lazy_rimraf() {
    if (_rimraf) {
      _rimraf.apply(_rimraf, arguments);
    }
    
    else {
      var args = Array.prototype.slice.call(arguments);
      setTimeout(function () {
        lazy_rimraf.apply(null, args);
      }, 100);
    }
  };
})();

var git_clone = exports.git_clone = function (url, cb) {
  var folder = url.slice(url.lastIndexOf('/') + 1);
  
  rimraf(folder, function (err) {
    if (err) { return cb(err); }
    
    exec('git clone ' + url + ' ' + folder, function (err, stdout, stderr) {
      if (stdout) { process.stdout.write(stdout); }
      if (stderr) { process.stderr.write(stderr); }
      
      if (err) { return cb(err); }
      
      rimraf(folder + '/.git', function (err) {
        cb(err);
      });
    });
  });
};

exports.clone_repos = function (repos, cb) {
  var runs = 0;
  var cloneErr = null;
  
  repos.forEach(function (repo) {
    git_clone(repo, function (err) {
      if (err) { cloneErr = err; }
      if (++runs === repos.length) { cb(cloneErr); }
    });
  });
};