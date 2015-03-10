'use strict';

var postinstall = require('./lib/postinstall');

var repos = [
  'https://github.com/syngan/vim-vimlint',
  'https://github.com/ynkdir/vim-vimlparser'
];


switch (process.argv[process.argv.length - 1]) {
  case 'postinstall':
    postinstall.clone_repos(repos, function (err) {
      if (err) { console.error(err); }
    });
    break;
}
