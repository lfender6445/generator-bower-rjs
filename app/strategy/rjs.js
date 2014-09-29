var fs = require('fs.extra');

var RjsStrategy = function () {

  var strategyfolder = 'rjs/';
  this.execute = function (generator) {
    generator.template(strategyfolder + '_bower.json', 'bower.json');
    generator.template(strategyfolder + '_bower-component.coffee', 'src/' + generator.bowerComponentName + '.coffee');

    // TODO: Is there way to handle bower related grunt tasks via gulp?
    generator.template(strategyfolder + '_Gruntfile.js', 'Gruntfile.js');

    generator.template(strategyfolder + '_gulpfile.coffee', 'gulpfile.coffee');

    generator.template(strategyfolder + '_Gemfile', 'Gemfile');
    generator.template(strategyfolder + '_Rakefile', 'Rakefile');
    generator.template(strategyfolder + '_index.html', 'examples/index.html');

    var testFolder = generator.sourceRoot() + '/' + strategyfolder + 'jasmine';

    fs.copyRecursive(testFolder, './test', function (err) { if (err) { throw err; } });

    generator.template(strategyfolder + '_bower-component-tests.coffee', './test/coffee/' + generator.bowerComponentName + '-spec.coffee');
  }

};

module.exports = new RjsStrategy();
