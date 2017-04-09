gulp = require('gulp')
less = require('gulp-less')
gutil = require('gulp-util')
minifyCSS = require('gulp-minify-css')
uglify = require('gulp-uglify')
chalk = require('chalk')
logger = require('gulp-logger')
rename = require('gulp-rename')
concat = require('gulp-concat')
sass = require('gulp-sass')
htmlmin = require('gulp-htmlmin')
babel = require('gulp-babel')
sass = require('gulp-sass')
pug = require('gulp-pug')
rollup     = require('gulp-rollup')

gulp.task 'vendor_css', ->
    gulp.src('./assets/css/scss/bootstrap/bootstrap-material-design.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS(keepSpecialComments: 1))
    .pipe(logger(
        before: 'Compressing Css '
        after: 'Compressing finished!'
        extname: '.min.css'
        showChange: true))
    .pipe(rename(suffix: '.min'))
    .pipe gulp.dest('./docs/assets/css')
    return


gulp.task 'sass', ->
  gulp.src('./assets/css/sass/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCSS())
  .pipe(rename(suffix: '.min'))
  .pipe gulp.dest('./dist/css')
  return



gulp.task 'js_app', ->
    gulp.src('./assets/js/app/*.js')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err.message)
        return
    ).pipe(logger(
        before: 'Compling App Javascript'
        after: 'Finished!'
        showChange: true))
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./dist/js'))
    return


gulp.task 'js_vendor', ->
    gulp.src([
        './assets/js/vendor/material/**/*.js'
    ]).on('error', (err) ->
        gutil.log gutil.colors.red(err.message)
        return
    )
    .pipe(rollup({

          entry: './assets/js/vendor/material/index.js'
        }))
    .pipe(logger(
        before: 'Compling Vendor Javascript'
        after: 'Finished!'
        showChange: true))
    .pipe(concat('vendor.min.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./docs/assets/js/'))
    return

gulp.task 'html', ->
  gulp.src('assets/views/*.pug')
  .pipe(pug({}))
  .pipe(logger(
    before: 'Minifing HTML'
    after: 'Finished!'
    showChange: true))
    .pipe(gulp.dest('./docs'))

  return




gulp.task 'build', [
    'vendor_css'
    'sass'
    'js_vendor'
    'js_app'
    'html'
]

gulp.task 'default', [ 'build' ]
