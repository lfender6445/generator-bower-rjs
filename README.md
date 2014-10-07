# generator-bower-rjs

yeoman generator for bower pkgs wrapped in a requirejs module definition

:heart: inspired by [generator-bower](https://github.com/ThorstenHans/generator-bower/)

## Install

```
npm install -g yo
npm install -g generator-bower-rjs
mkdir my-new-project
cd my-new-project
yo bower-rjs
```
## Usage

After your project has been created, you are equipped with some fairly robust defaults:

### Building with [gulp](http://gulpjs.com/)

run `gulp` to build your project. your final rjs build can be located at `./dist/packageName.js`

`gulp` by itself, will run the default task where:
- src files (js and coffee) are built to the `./dist` directory by default.
- coffee spec files are compiled
  - when src files change, a new rjs build will create your final rjs package at `dist/package_name`

run `gulp -T` for a list of available tasks

### [RequireJS Build + Config](http://requirejs.org/docs/api.html#config)
`./node_modules/requirejs/bin/r.js -o require.build.js optimize=none` || `gulp build_rjs`

- `./dist/require.config.js`
  - used to configure `examples/index.html` and specs, not for use outside of package
  - external dependencies amended to bower.json can be automatically added to the config by running `grunt`
  - internal dependencies must be added manually
- `require.build.js`
  - similar to require.config, but is instead used to build the final bower component
  - external + internal depencies must be manually added
  - your final concatenated build can be located at `./dist/packageName.js`

### Versioning
See [gulp-release-tasks](https://www.npmjs.org/package/gulp-release-tasks) for additional release tasks.

# Testing
```
bundle exec rake jasmine
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
