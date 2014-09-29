gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
uglify  = require 'gulp-uglify'
gutil   = require 'gulp-util'
rename  = require 'gulp-rename'
sys     = require('sys')
exec    = require('child_process').exec

p = require('./package.json')

destinations =
  # Loc for compiled coffee output
  js:   './dist/shared/'
  test: './spec/javascripts/shared/'

sources =
  coffee: './src/*.coffee'
  test:   './spec/javascripts/coffee/*.coffee'

gulp.task 'build', ->
  exec "./node_modules/requirejs/bin/r.js -o require.build.js optimize=none", ->
    console.log 'Build success - package can be found at dist/<%= bowerComponentName %>.js'

gulp.task 'default', ->
  gulp.src sources.coffee
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(destinations.js))

gulp.task 'test', ->
  gulp.src sources.test
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(destinations.test))

gulp.task 'watch', ['build'], ->
  gulp.watch sources.coffee, ['default', 'build']
  gulp.watch sources.test, ['test']

git    = require('gulp-git')
bump   = require('gulp-bump')
filter = require('gulp-filter')
prompt = require('gulp-prompt')
tag_version = require('gulp-tag-version')

paths =
  scripts: ['dist/*.js']
  versionToBump: ['./package.json', './bower.json']
  versionToCheck: 'package.json'
  dest: './'

inc = (importance, initials) ->
  gulp.src(paths.versionToBump)
    .pipe(bump(type: importance))
    .pipe(gulp.dest(paths.dest))
    .pipe(git.commit('Version bump'))
    .pipe(filter(paths.versionToCheck))
    .pipe tag_version()
    .pipe(git.push('origin', 'master', { args: '--tags' }))

gulp.task 'patch',   -> inc 'patch'
gulp.task 'feature', -> inc 'minor'
gulp.task 'release', -> inc 'major'
