'use strict';
var RjsStrategy = function () {
  var strategyfolder = 'rjs/';
  this.execute = function (generator) {
    generator.template(strategyfolder + '_bower.json', 'bower.json');
    generator.template(strategyfolder + '_bower-component.coffee', 'src/' + generator.slug + '.coffee');
    generator.template(strategyfolder + '_package.json', 'package.json');
    generator.template(strategyfolder + '_Gruntfile.js', 'Gruntfile.js');
    generator.template(strategyfolder + '_gulpfile.coffee', 'gulpfile.coffee');
    generator.template(strategyfolder + '_require.build.js', 'require.build.js');
    generator.template(strategyfolder + '_require.config.js', 'dist/require.config.js');
    generator.template(strategyfolder + '_Gemfile', 'Gemfile');
    generator.template(strategyfolder + '_Rakefile', 'Rakefile');
    generator.template(strategyfolder + '_README.md', 'README.md');
    generator.template(strategyfolder + '_index.html', 'examples/index.html');
    generator.bulkDirectory(strategyfolder + 'jasmine/javascripts', 'spec/javascripts');
    generator.template(strategyfolder + '_bower-component-spec.coffee', './spec/javascripts/coffee/' + generator.slug + '-spec.coffee');
  };
};
module.exports = new RjsStrategy();
