'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mochacov: {
      options: {
        files: 'test/**/*-test.js',
        timeout: 10 * 1000
      },
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coverage: {
        options: {
          coveralls: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: ['*.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    jsonlint: {
      files: ['.jshintrc', '*.json']
    }
  });
  
  var testTasks = ['jshint', 'jsonlint', 'mochacov:test'];
  if (process.env.CI) {
    testTasks.push('mochacov:coverage');
  }
  
  grunt.registerTask('test', testTasks);
  
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
};