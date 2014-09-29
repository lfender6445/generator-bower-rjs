'use strict';

var util    = require('util');
var fs      = require('fs.extra');
var path    = require('path');
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');
var chalk   = require('chalk');
var _       = require('underscore.string');
var exec    = require('child-process').exec;

var BowerGenerator = module.exports = function Appgenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
      exec('npm start;')
    }
  });

  this.pkg = require('../package.json');
};

require('util').inherits(BowerGenerator, yeoman.generators.Base);

BowerGenerator.prototype.askFor = function askFor() {
  var done = this.async();
  this.log(yosay('yo generator for bower + rjs'));
  var prompts;
  var prompts = [{
    name: 'bowerComponentName',
    message: "enter a name for your bower rjs module:"
  }, {
    name: 'description',
    message: 'provide a short description for your rjs module or press enter'
  }];
  this.prompt(prompts, function (props) {
    this.bowerComponentName = props.bowerComponentName;
    this.description = (props.description || props.bowerComponentName);
    this.slug = _.slugify(this.bowerComponentName);
    this.coffeeClass = _.camelize(this.bowerComponentName);
    done();
  }.bind(this));
};

BowerGenerator.prototype.app = function app() {
  this.mkdir('test');
  this.mkdir('src');
  this.mkdir('dist');
  this.mkdir('examples');
  this.componentName = _.slugify(this.bowerComponentName);

  var strategy;
  this.options.rjs = true;
  if (this.options.rjs === true) {
    this.extension = 'rjs';
    this.log('generating bower-rjs module');
    strategy = require('./strategy/rjs.js');
  }
  strategy.execute(this);
};

BowerGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
