'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;
var rimraf  = require('rimraf');

describe('generator-bower-rjs', function () {

  var promt = {
    'bowerComponentName': 'bower mock',
    'description': ''
  };

  beforeEach(function (done) {
    var folder = path.join(__dirname, './temp');
    rimraf(folder + '/spec/javascripts', function(){});
    helpers.testDirectory(folder, function (err) {
      if (err) { return done(err); }
      this.app = helpers.createGenerator('bower-rjs:app', [ '../../app' ]);
      done();
    }.bind(this));
  });

  describe('file generation test', function () {
    var expected = [
      '.jshintrc',
      'bower.json',
      'Gemfile',
      'gruntfile.js',
      'gulpfile.coffee',
      'package.json',
      'Rakefile',
      'require.build.js',
      'dist/require.config.js',
      'examples/index.html',
      'src/bower-mock.coffee',
      'spec/javascripts/coffee/bower-mock-spec.coffee',
      'spec/javascripts/helpers/spec_helper.js',
      'spec/javascripts/shared/',
      'spec/javascripts/support/jasmine.yml',
      'spec/javascripts/support/jasmine_helper.rb'
    ];
    beforeEach(function (done) {
      helpers.mockPrompt(this.app, promt);
      this.app.options['skip-install'] = true;
      done();
    });

    it('creates expected common files', function (done) {
      this.app.run({}, function () {
        assert.file(expected);
        done();
      });
    });

  });

});
