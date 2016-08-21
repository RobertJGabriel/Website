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
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');

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



gulp.task('scripts', function() {
  gulp.src('./assets/js/*/*.*').pipe(uglify()).pipe(logger({
    before: 'Starting Compressing Javascript',
    after: 'Compressing complete!',
    extname: '.js',
    showChange: false
  })).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('./dist/js'));
});


gulp.task('views', function() {
  return gulp.src('assets/view/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(''));

});


// Default Task
gulp.task('default', ['less','scripts','views']);
