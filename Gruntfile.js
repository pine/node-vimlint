'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mochacov: {
      options: {
        files: 'test/**/*-test.js'
      },
      test: {
        options: {
          reporter: 'spec'
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
  
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
};