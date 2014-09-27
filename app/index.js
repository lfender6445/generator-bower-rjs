'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');

/**
 * Initialization Function.
 */
var BowerGenerator = module.exports = function Appgenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  // After finishing.
  this.on('end', function () {
    // Will instal dependencies if configured to it.
    if (!this.options['skip-install']) {
      this.installDependencies();
    }

  });

  this.pkg = require('../package.json');
};

require('util').inherits(BowerGenerator, yeoman.generators.Base);


BowerGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // Have Yeoman greet the user.
  this.log(yosay('yo generator for bower + rjs'));

  // Promot - If Dummy, nothing will be asked to user
  var prompts;
  if (this.options.dummy !== true) {
    var prompts = [{
      name: 'bowerComponentName',
      message: "enter a name for your bower component:"
    }, {
      name: 'description',
      message: 'provide a short description for your component or press enter'
    }];
  } else {
    prompts = [];
  }

  // Promtp all questions, if not on dummy mode.
  this.prompt(prompts, function (props) {

    // dummy project will use default vaules
    // if (this.options.dummy === true) {
    //   this.bowerComponentName = 'dummy';
    //   this.description = 'dummy component';
    //   this.livereloadPort = 35729;
    // } else {
    this.bowerComponentName = props.bowerComponentName;
    this.description = props.description || props.bowerComponentName;
    this.livereloadPort = 35729;
    this.slug = _.slugify(this.bowerComponentName);
    this.validVariableName = _.capitalize(_.slugify(this.bowerComponentName)).replace('-', '');
    done();
  }.bind(this));
};

BowerGenerator.prototype.app = function app() {
  this.mkdir('test');
  this.mkdir('src');
  this.mkdir('examples');
  this.componentName = _.slugify(this.bowerComponentName);

  // Choose strategy by used choice
  var strategy;
  this.options.rjs = true;
  if (this.options.rjs === true) {
    this.extension = 'rjs';
    this.log('generating bower-rjs module');
    strategy = require('./strategy/rjs.js');
  }

  //if (this.options.coffee === true) {
  //  this.extension = 'coffee';
  //  this.log('Generating CoffeeScript code.');
  //  strategy = require('./strategy/coffee.js');
  //} else {
  //  this.extension = 'js';

  //  this.log('Generating javaScript code.');
  //  strategy = require('./strategy/javascript.js');
  //}

  // Execute extrategy configuration.
  strategy.execute(this);

  // if (this.options.dummy === true) {
  //   // Create additional dummy files.
  //   require('./strategy/dummy.js').createdumies(this, this.options.coffee);
  // }

  //this.template('_package.json', 'package.json');
  //this.template('_bower.json', 'bower.json');
  //this.copy('_index.html', 'examples/index.html');
};

BowerGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
