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
    copy: {
      'vim-vimlint': {
        expand: true,
        cwd: 'vim-vimlint',
        src: '**',
        dest: 'build/vim-vimlint/'
      },
      'vim-vimlparser': {
        expand: true,
        cwd: 'vim-vimlparser',
        src: '**',
        dest: 'build/vim-vimlparser/'
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
      lint: ['jshint', 'jsonlint']
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
    ['env:coverage', 'copy', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);
  grunt.registerTask('test', ['lint', 'coverage']);
};