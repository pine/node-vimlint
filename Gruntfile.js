'use strict';

var path = require('path');

module.exports = function(grunt) {
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
      },
      'package.json': {
        src: 'package.json',
        dest: 'build/'
      }
    },

    // ------------------------------------------------------------------------

    instrument: {
      files: 'lib/**/*.js',
      options: {
        lazy: false,
        basePath: 'build'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        timeout: 30 * 1000
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

    // ------------------------------------------------------------------------

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    jsonlint: {
      files: ['.jshintrc', '*.json']
    },

    // ------------------------------------------------------------------------

    concurrent: {
      lint: ['jshint', 'jsonlint'],
      coverage: ['shell:codeclimate', 'shell:coveralls']
    },

    // ------------------------------------------------------------------------

    shell: {
      codeclimate: {
        command: 'codeclimate-test-reporter < coverage/reports/lcov.info'
      },
      coveralls: {
        command: 'coveralls < coverage/reports/lcov.info'
      }
    }
  });

  // ==========================================================================

  grunt.registerTask('lint', ['concurrent:lint']);
  grunt.registerTask('mocha',
    ['env:coverage', 'copy', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);
  grunt.registerTask('test', ['lint', 'mocha']);
  grunt.registerTask('coverage', ['concurrent:coverage']);

  require('load-grunt-tasks')(grunt);
};
