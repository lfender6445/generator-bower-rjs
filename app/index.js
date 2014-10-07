'use strict';
var _ = require('underscore.string');
var yosay = require('yosay');
var yeoman = require('yeoman-generator');
// init, askFor, app, and projectfiles will be invoked in order
var BowerRjsGenerator = module.exports = function Appgenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  });
  this.pkg = require('../package.json');
};
require('util').inherits(BowerRjsGenerator, yeoman.generators.Base);
BowerRjsGenerator.prototype.askFor = function askFor() {
  var done = this.async();
  this.log(yosay('yo generator for bower + rjs'));
  var prompts = [
  {
    name: 'bowerComponentName',
      message: 'enter a name for your bower rjs module:'
  },
  {
    name: 'description',
    message: 'provide a short description for your rjs module or press enter'
  }
  ];
  this.prompt(prompts, function (props) {
    this.bowerComponentName = props.bowerComponentName;
    this.description = props.description || props.bowerComponentName;
    this.slug = _.slugify(this.bowerComponentName);
    // if _.include this.coffeePreference.toLowerCase(), 'y'
    this.coffeeClass = _.camelize(this.bowerComponentName);
    done();
  }.bind(this));
};
BowerRjsGenerator.prototype.app = function app() {
  this.mkdir('spec');
  this.mkdir('src');
  this.mkdir('dist');
  this.mkdir('examples');
  this.componentName = _.slugify(this.bowerComponentName);
  var strategy;
  this.options.rjs = true;
  if (this.options.rjs === true) {
    this.extension = 'rjs';
    this.log('bower-rjs');
    strategy = require('./strategy/rjs.js');
  }
  strategy.execute(this);
};
BowerRjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
