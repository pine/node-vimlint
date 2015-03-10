'use strict';

var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var exec = childProcess.exec;
var rimraf = require('rimraf');
var async = require('async');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var requireHelper = require('./require-helper');
var postinstall = requireHelper('lib/postinstall');

// rimraf が失敗するディレクトリ
var ERROR_DIR = '/root';

if (/^win/.test(process.platform)) {
  ERROR_DIR = 'C:\\Documents and Settings';
}

else if (/^darwin/.test(process.platform)) {
  ERROR_DIR = '/private/var/root';
}

describe('Unit test for lib/postinstall.js', function () {
  describe('rimraf', function () {
    it('should load rimraf', function (done) {
      var file = path.join(__dirname, 'rimraf-test.txt');
      
      fs.writeFile(file, '', function (err) {
        expect(err).to.not.be.ok;
        
        postinstall.rimraf(file, function (err) {
          expect(err).to.not.be.ok;
          done();
        });
      });
    });
    
    it('should load rimraf with a delay', function (done) {
      var file = path.join(__dirname, 'rimraf-test.txt');
      fs.writeFile(file, '', function (err) {
        expect(err).to.not.be.ok;
        
        var modules = path.join(__dirname, '../node_modules/rimraf');
        rimraf(modules, function (err) {
          expect(err).to.not.be.ok;
          
          async.parallel([
            function (cb) {
              var npm_cmd = 'npm install rimraf';
              exec(npm_cmd, function (err, stdout, stderr) {
                cb(err);
              });
            },
            function (cb) {
              delete require.cache[require.resolve('rimraf')];
              requireHelper('lib/postinstall').rimraf(file, function (err) {
                expect(err).to.not.be.ok;
                cb(err);
              });
            }
          ],
          function (err) {
            expect(err).to.not.be.ok;
            done();
          });
        });
      });
    });
  });
  
  // ------------------------------------------------------------------------
  
  describe('git_clone', function () {
    it('should clone a repository', function (done) {
      var url = 'https://github.com/pine613/node-vimlint';
      postinstall.git_clone(url, function (err) {
        expect(err).to.not.be.ok;
        done();
      });
    });
    
    it('should write stdout', function (done) {
      var sandbox = sinon.sandbox.create();
      sandbox.stub(String.prototype, 'slice', function () {
        return 'node-vimlint';
      });
      
      var url = 'https://github.com/pine613/node-vimlint && echo test mock';
      
      postinstall.git_clone(url, function (err) {
        expect(err).to.not.be.ok;
        sandbox.restore();
        done();
      });
    });
    
    it('should fail to clone a repository url\'s scheme is invalid', function (done) {
      var url = 'xhttps://github.com/pine613/node-vimlint';
      postinstall.git_clone(url, function (err) {
        expect(err).to.be.ok;
        done();
      });
    });
    
    it('should fail to clone a repository because directory can\'t remove', function (done) {
      var url = {
        slice: function () { return ERROR_DIR; },
        lastIndexOf: function () { }
      };
      postinstall.git_clone(url, function (err) {
        expect(err).to.be.ok;
        done();
      });
    });
  });
  
  // ------------------------------------------------------------------------
  
  describe('clone_repos', function () {
    it('should clone repository', function (done) {
      var url = 'https://github.com/pine613/node-vimlint';
      postinstall.clone_repos([url], function (err) {
        done(err);
      });
    });
    
    it('should fail to clone a repository', function (done) {
      var url = {
        slice: function () { return ERROR_DIR; },
        lastIndexOf: function () { }
      };
      postinstall.clone_repos([url], function (err) {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});