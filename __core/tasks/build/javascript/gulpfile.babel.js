
import gulp from 'gulp';

import HubRegistry from 'gulp-hub';
var hub = new HubRegistry(['./project1/gulpfile.js', './project2/gulpfile.js']);
/* tell gulp to use the tasks just loaded */
gulp.registry(hub);



import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import concat from 'gulp-concat';;

import config from './__core/settings/config.json';

config.basedir = __dirname;
gulp.task('app_js', () => {
    return gulp
      .src([
  
        './app/assets/js/app/vue/navigation.js'
      ])
      .on('error', err => {
        gutil.log(gutil.colors.red(err))
      })
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./dist/assets/js'))
  })

  



gulp.task('app_js_vue', () => {
    return gulp
      .src('./app/assets/js/app/vue/*.js')
      .on('error', err => {
        gutil.log(gutil.colors.red(err))
      })
      .pipe(gulp.dest('./dist/assets/js/vue/'))
  })
  
  gulp.task('vendor_js', () => {
    return gulp
      .src(['./app/assets/js/vendor/vue.js'])
      .on('error', err => {
        gutil.log(gutil.colors.red(err.background_imagessage))
      })
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/assets/js/'))
  })
  
  gulp.task('webp_js', () => {
    return gulp
      .src(['./app/assets/js/vendor/webpjs.js'])
      .on('error', err => {
        gutil.log(gutil.colors.red(err.background_imagessage))
      })
      .pipe(concat('webpjs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/assets/js/'))
  })
  