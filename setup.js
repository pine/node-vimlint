'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var rimraf;

var repos = [
  'https://github.com/syngan/vim-vimlint',
  'https://github.com/ynkdir/vim-vimlparser'
];

function git_clone(url) {
  var folder = url.slice(url.lastIndexOf('/') + 1);
  
  rimraf(folder, function (err) {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    
    exec('git clone ' + url + ' ' + folder, function (err, stdout, stderr) {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      
      if (err) {
        return process.exit(1);
      }
      
      else {
        rimraf(folder + '/.git', function (err) {
          if (err) {
            console.error(err);
            return process.exit(1);
          }
        });
      }
    });
  });
}

function clone_repos(repos) {
  repos.forEach(function (repo) {
    git_clone(repo);
  });
}

function waitRimraf(cb) {
  try {
    rimraf = require('rimraf');
    cb();
  }
  
  catch (e) {
    setTimeout(function () { waitRimraf(cb); }, 100);
  }
}

switch (process.argv[process.argv.length - 1]) {
  case 'postinstall':
    waitRimraf(function () { clone_repos(repos); });
    break;
}
