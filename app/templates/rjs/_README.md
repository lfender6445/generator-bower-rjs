<%= slug %>.js
_____________________________
<%= description %>

# Install

```
npm install
bower install
bundle install
gulp
````

## Building with [gulp](http://gulpjs.com/)

run `gulp -T` for a list of available tasks

`gulp` by itself, will run the default task

- src files are built to the `./dist` directory by default.
- watches and compiles coffee for specs and src
- builds your final rjs package at dist/<%= slug %>

## [RequireJS Build + Config](http://requirejs.org/docs/api.html#config)
`./node_modules/requirejs/bin/r.js -o require.build.js optimize=none` - runs automatically with gulp when changes are detected.

- `./dist/require.config.js`
  - used to configure `examples/index.html` and specs, not used outside of package
  - external dependencies amended to bower.json can be automatically added to the config by running `grunt`
  - internal dependencies must be added manually
- `require.build.js`
  - similar to require.config, but is instead used to build the final bower component
  - external + internal depencies must be manually added

## Versioning
See [gulp-release-tasks](https://www.npmjs.org/package/gulp-release-tasks) for additional release tasks.

# Testing
```
bundle exec rake jasmine
```
