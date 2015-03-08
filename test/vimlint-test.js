'use strict';

var path = require('path');
var chai = require('chai');
var expect = chai.expect;

var vimlint = require('../lib/vimlint');

describe('Unit test for lib/vimlint.js', function () {
  it('should pass test', function (done) {
    vimlint(
      path.join(__dirname, 'succeeded.vim'),
      function (err, stdout, stderr) {
        if (stdout) { process.stdout.write(stdout); }
        if (stderr) { process.stderr.write(stderr); }
        expect(err).to.not.be.ok;
        done(err);
      });
  });
  
  it('should fail test', function (done) {
    vimlint(
      path.join(__dirname, 'failed.vim'),
      function (err, stdout, stderr) {
        if (stdout) { process.stdout.write(stdout); }
        if (stderr) { process.stderr.write(stderr); }
        expect(err).to.be.ok;
        done();
      });
  });
});