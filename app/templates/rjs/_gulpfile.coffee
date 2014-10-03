gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
uglify  = require 'gulp-uglify'
gutil   = require 'gulp-util'
rename  = require 'gulp-rename'
watch   = require 'gulp-watch'
p       = require './package.json'
exec    = require('child_process').exec

js_in        = './src/**/*.js'
coffee_in    = './src/**/*.coffee'

js_out       = './dist/js/'
coffee_out   = './dist/shared/'

test_in  = './spec/javascripts/coffee/*'
test_out = './spec/javascripts/shared/'

gulp.task 'default', ->
  gulp.start 'build_coffee'
  gulp.watch './**/*.coffee', ->
    gulp.start 'build_coffee'
    gulp.start 'build_rjs'

  gulp.watch js_in, ->
    gulp.start 'copy_js'
    gulp.start 'build_rjs'

# important we build r.js build AFTER coffee assets have compiled or been transferred to dist
gulp.task 'build_rjs', ['build_coffee', 'copy_js'], ->
  exec "./node_modules/requirejs/bin/r.js -o require.build.js optimize=none", ->
    console.log 'Build success - package can be found at ./dist/<%= slug %>.js'

gulp.task 'copy_js', ->
  gulp.src(js_in).pipe(gulp.dest(js_out))

gulp.task 'build_coffee', ->
  try
    gulp.src(coffee_in)
      .pipe(coffee().on('error', gutil.log))
      .pipe(gulp.dest(coffee_out))
    gulp.start 'build_rjs'
    gulp.src(test_in)
      .pipe(coffee())
      .pipe(gulp.dest(test_out))
  catch e
    console.log e

# release tasks
prompt      = require('gulp-prompt')
git         = require('gulp-git')
bump        = require('gulp-bump')
filter      = require('gulp-filter')
tag_version = require('gulp-tag-version')
paths =
  scripts: ['dist/*.js']
  versionToBump: ['./package.json', './bower.json']
  versionToCheck: 'bower.json'
  dest: '.'

# version bump for (bower & package).json files, w prompt for commit
inc = (importance) ->
  gulp.src(paths.versionToBump)
    .pipe(bump(type: importance))
    .pipe(gulp.dest(paths.dest))
    .pipe prompt.prompt(
      type: "input"
      name: "commit_msg"
      message: "Enter a commit message:"
    , (res) ->
      git.commit(res.commit_msg)
    ).pipe(filter(paths.versionToCheck))
    .pipe tag_version()
    .pipe(git.push('origin', 'master', { args: '--tags' }))

gulp.task 'patch',   -> inc 'patch'
gulp.task 'feature', -> inc 'minor'
gulp.task 'release', -> inc 'major'
