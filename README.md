node-vimlint
------------

[![npm version](https://img.shields.io/npm/v/vimlint.svg?style=flat-square)](http://badge.fury.io/js/vimlint)
[![Build Status](https://img.shields.io/travis/pine613/node-vimlint/master.svg?style=flat-square)](https://travis-ci.org/pine613/node-vimlint)
[![Code Climate](https://img.shields.io/codeclimate/github/pine613/node-vimlint.svg?style=flat-square)](https://codeclimate.com/github/pine613/node-vimlint)
[![Coverage Status](https://img.shields.io/coveralls/pine613/node-vimlint/master.svg?style=flat-square)](https://coveralls.io/r/pine613/node-vimlint?branch=master)
[![Dependency Status](https://img.shields.io/david/pine613/node-vimlint.svg?style=flat-square)](https://david-dm.org/pine613/node-vimlint)
[![devDependency Status](https://img.shields.io/david/dev/pine613/node-vimlint.svg?style=flat-square)](https://david-dm.org/pine613/node-vimlint#info=devDependencies)


Validate .vimrc, .vim files with [vimlint](https://github.com/syngan/vim-vimlint).

## Getting Started

This library requires `sh` and Vim.

```sh
$ npm install vimlint --save
```

If you want to use `vimlint` command on CLI, try to install in global (>= v0.2.0).

```sh
$ npm install -g vimlint
```

## References
### vimlint(path, cb)

- path: `string` ... Target .vim file path (not `Array`)
- cb: `function` ... Callback function
   - err: `object` ... Error object
   - stdout: `string` ... Log string of vimlint
   - stderr: `string` ... Error string of vimlint

```js
var vimlint = require('vimlint')

vimlint('testfile.vim', function (err, stdout, stderr) {
  if (stdout) { process.stdout.write(stdout); }
  if (stderr) { process.stderr.write(stderr); }

  if (err) {
    console.log('ERROR', err);
  }

  else {
    console.log('OK');
  }
});
```

### $ vimlint \<file ...\>

```sh
$ vimlint -h

  Usage: vimlint <file ...>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

$ vimlint foo.vim
```

## Additional Notes
This library **doesn't work** on Windows. It works on Linux, Mac OS X, or other *nix OSs.

## Plugins
This library can use from Grunt and gulp.

- [grunt-vimlint](https://github.com/pine613/grunt-vimlint)
- [gulp-vimlint](https://github.com/pine613/gulp-vimlint)
- [fly-vimlint](https://github.com/pine613/fly-vimlint)

## Acknowledgement
This library uses following software to validate `.vim` files. Thank you.

 - [syngan](https://github.com/syngan) / [vim-vimlint](https://github.com/syngan/vim-vimlint)
 - [ynkdir](https://github.com/ynkdir) / [vim-vimlparser](https://github.com/ynkdir/vim-vimlparser)

## License
MIT License
