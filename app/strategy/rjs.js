var fs = require('fs.extra');

var RjsStrategy = function () {

  var strategyfolder = 'rjs/';
  this.execute = function (generator) {
    // generator.template(strategyfolder + '_bower-component-tests.coffee', 'test/' + generator.componentName + '-tests.coffee');
    generator.template(strategyfolder + '_bower.json', 'bower.json');
    generator.template(strategyfolder + '_bower-component.coffee', 'src/' + generator.componentName + '.coffee');
    generator.template(strategyfolder + '_Gruntfile.coffee', 'Gruntfile.coffee');
    generator.template(strategyfolder + '_Gemfile', 'Gemfile');
    generator.template(strategyfolder + '_Rakefile', 'Rakefile');

    var testFolder = generator.sourceRoot() + '/' + strategyfolder + 'jasmine';
    fs.copyRecursive(testFolder, './test', function (err) {
      if (err) {
        console.log('file read error')
        throw err;
      }
    });

    generator.template(strategyfolder + '_bower-component-tests.coffee', './test/coffee/' + generator.componentName + '-spec.coffee');
  }

};

module.exports = new RjsStrategy();
