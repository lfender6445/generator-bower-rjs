gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
uglify  = require 'gulp-uglify'
gutil   = require 'gulp-util'
rename  = require 'gulp-rename'
watch   = require 'gulp-watch'
p       = require './package.json'
exec    = require('child_process').exec

js_out   = './dist/shared/'
js_in    = './src/*'
test_out = './spec/javascripts/shared/'
test_in  = './spec/javascripts/coffee/*'

gulp.task 'default', ->
  gulp.start 'build_coffee'
  gulp.start 'build_rjs'
  gulp.watch './**/*.coffee', ->
    gulp.start 'build_coffee'
    gulp.start 'build_rjs'

gulp.task 'build_rjs', ->
  exec "./node_modules/requirejs/bin/r.js -o require.build.js optimize=none", ->
    console.log 'Build success - package can be found at ./dist/<%= slug =>'

gulp.task 'build_coffee', ->
  try
    gulp.src(js_in)
      .pipe(coffee().on('error', gutil.log))
      .pipe(gulp.dest(js_out))
    gulp.src(test_in)
      .pipe(coffee())
      .pipe(gulp.dest(test_out))
  catch e
    console.log e

# release tasks
prompt     = require('gulp-prompt')
git        = require('gulp-git')
bump       = require('gulp-bump')
filter     = require('gulp-filter')
tag_version = require('gulp-tag-version')
paths =
  scripts: ['dist/*.js']
  versionToBump: ['./package.json', './bower.json']
  versionToCheck: 'bower.json'
  dest: '.'

inc = (importance) ->
  gulp.src(paths.versionToBump)
    .pipe(bump(type: importance))
    .pipe(gulp.dest(paths.dest))
     #  Prompt user for commit msg
     # .pipe(git.commit('Version bump'))
     # .pipe(filter(paths.versionToCheck))
     # .pipe tag_version()
     # .pipe(git.push('origin', 'master', { args: '--tags' }))

gulp.task 'patch',   -> inc 'patch'
gulp.task 'feature', -> inc 'minor'
gulp.task 'release', -> inc 'major'
