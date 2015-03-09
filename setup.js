'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var rimraf = require('rimraf');

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

switch (process.argv[process.argv.length - 1]) {
  case 'postinstall':
    clone_repos(repos);
    break;
}
