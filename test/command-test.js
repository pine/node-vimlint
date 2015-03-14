'use strict';

var path = require('path');
var fs = require('fs');
var commander = require('commander');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var requireHelper = require('./require-helper');
var command = requireHelper('lib/command');

describe('Test for lib/command.js', function () {
  describe('parser', function () {
    it('should be an instance of commander', function () {
      expect(command.parser).to.be.an.instanceof(commander.Command);
    });
  });
  
  describe('lintFiles', function () {
    it('should pass test', function (done) {
      var files = [path.join(__dirname, 'succeeded.vim')];
      command.lintFiles(files, function (errs) {
        expect(errs).to.not.be.ok;
        done();
      });
    });
    
    it('should fail test', function (done) {
      var files = [path.join(__dirname, 'failed.vim')];
      command.lintFiles(files, function (errs) {
        expect(errs).to.be.an.instanceof(Array);
        expect(errs).to.have.length(1);
        done();
      });
    });
  });
});