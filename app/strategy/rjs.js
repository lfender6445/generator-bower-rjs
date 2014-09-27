var RjsStrategy = function () {

  var strategyfolder = 'rjs/';
  this.execute = function (generator) {
    // generator.template(strategyfolder + '_bower-component-tests.coffee', 'test/' + generator.componentName + '-tests.coffee');
    generator.template(strategyfolder + '_bower.json', 'bower.json');
    generator.template(strategyfolder + '_bower-component.coffee', 'src/' + generator.componentName + '.coffee');
    generator.template(strategyfolder + '_Gruntfile.coffee', 'Gruntfile.coffee');
    generator.template(strategyfolder + '_Gemfile', 'Gemfile');
    generator.template(strategyfolder + '_Rakefile', 'Rakefile');
    generator.template(strategyfolder + 'jasmine/*', 'Rakefile');
  }

};

module.exports = new RjsStrategy();
