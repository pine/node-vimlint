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
  
  grunt.registerTask('test', ['jshint', 'jsonlint', 'mochacov:test']);
  grunt.registerTask('coverage', ['mochacov:coverage']);
  
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
};