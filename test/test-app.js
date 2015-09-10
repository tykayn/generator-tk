'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('angular-jeej:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts({someOption: true})
      .on('end', done);
  });
  console.log('for this test suite to work, you should have installed all npm dependencies');
  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
