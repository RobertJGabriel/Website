

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import concat from 'gulp-concat';





module.exports = {
  app_js: function () {
    return gulp
      .src([
        './app/assets/js/app/vue/navigation.js'
      ])
      .on('error', err => {
        gutil.log(gutil.colors.red(err))
      })
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./dist/assets/js'))
  },
  app_js_vue: function () {
    return gulp
    .src('./app/assets/js/app/vue/*.js')
    .on('error', err => {
      gutil.log(gutil.colors.red(err))
    })
    .pipe(gulp.dest('./dist/assets/js/vue/'))
  },
  vendor_js: function () {
    return gulp
    .src(['./app/assets/js/vendor/vue.js'])
    .on('error', err => {
      gutil.log(gutil.colors.red(err.background_imagessage))
    })
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'))
  },
  webp_js: function () {
        return gulp
      .src(['./app/assets/js/vendor/webpjs.js'])
      .on('error', err => {
        gutil.log(gutil.colors.red(err.background_imagessage))
      })
      .pipe(concat('webpjs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/assets/js/'))
  }
}





