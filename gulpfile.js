var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var logger = require('gulp-logger');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-html-minifier');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var concat = require('gulp-concat');


gulp.task('less', function() {
  gulp.src('./assets/less/styles.less')
    .pipe(less()
      .on('error', gutil.log)
      .on('error', gutil.beep)
      .on('error', function(err) {
        console.log('err', err);
        var pathToFile = err.fileName.split('\\');
        file = pathToFile[pathToFile.length - 1];
      })
    )
    .pipe(minifyCSS({
      keepSpecialComments: 1
    }))
    .pipe(gulp.dest('./dist/css/'));
});


gulp.task('fonts',function(){
  return gulp.src([
      './assets/fonts/*',
  ])
  .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('downloads',function(){
  return gulp.src([
      './assets/downloads/*/**',
  ])
  .pipe(gulp.dest('./dist/downloads/'));
});


gulp.task('scripts', function() {
  return gulp.src([
    './assets/js/vendor/jquery.js',
    './assets/js/vendor/bootstrap.js',
    './assets/js/vendor/core.js',
    './assets/js/vendor/material.js',
    './assets/js/vendor/ripples.js',
    './assets/js/app/main.js'
    ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('views', function() {
  return gulp.src('assets/view/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(''));
});


gulp.task('clean', function(cb) {
	del([
    'dist/',
		'*.html',
		'!/googlea4b2e0ff05c168d5.html',
		'!gulpfile.js',
		'!CNAME',
    '!sitemap.xml',
    '!README.md'
	], cb);
});

// Default Task
gulp.task('default', ['clean','less','fonts','downloads','scripts','views']);
