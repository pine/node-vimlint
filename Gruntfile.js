'use strict';

var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: path.join(__dirname, 'build')
      }
    },
    instrument: {
      files: 'lib/**/*.js',
      options: {
        lazy: false,
        basePath: 'build'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*-test.js']
    },
    storeCoverage: {
      options: {
        dir: 'coverage/reports'
      }
    },
    makeReport: {
      src: 'coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'coverage/reports',
        print: 'detail'
      }
    },
    concurrent: {
      lint: ['jshint', 'jsonlint'],
      test: ['concurrent:lint', 'coverage']
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
  
  grunt.registerTask('lint', ['concurrent:lint']);
  grunt.registerTask('coverage',
    ['env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);
  grunt.registerTask('test', ['concurrent:test']);
};