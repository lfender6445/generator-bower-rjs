# Generator-bower-rjs

A Yeoman generator for Bower packages wrapped in a requirejs module definition.

Inspired by [https://github.com/ThorstenHans/generator-bower/](generator-bower)

## Usage ##

* not yet in npm registry, for now clone the project, cd into it, then run `npm link generator-bower-rjs`
```
npm install -g generator-bower-rjs
mkdir my-new-project
cd my-new-project
```

Run `yo bower-rjs`

- run `gulp`  for building
- run `grunt` to automate rjs configs or anytime your bower.json changes
    - this will soon be automated
- run `bundle; bundle exec rake jasmine` to start your tests

## TODO ##

Add support for plain old javascript

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
