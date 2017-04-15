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
rollup = require('gulp-rollup')
concatCss = require('gulp-concat-css')
del = require('del')
coffee = require('gulp-coffee')

gulp.task 'vendor_css', ->
    gulp.src('./assets/css/vendor/*.css')
    .pipe(concatCss("vendor.css"))
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



gulp.task 'app_js', ->
    gulp.src('./assets/js/app/*.coffee')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err.message)
        return
    ).pipe(logger(
        before: 'Compling App Javascript'
        after: 'Finished!'
        showChange: true))
    .pipe(coffee({bare: true}))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./docs/assets/js'))
    return


gulp.task 'vendor_js', ->
    gulp.src( [
        './assets/js/vendor/jquery.js',
        '.assets/js/vendor/tether.js',
        './assets/js/vendor/bootstrap.min.js',
        './assets/js/vendor/bootstrap-material-design.iife.js'
    ]).on('error', (err) ->
        gutil.log gutil.colors.red(err.message)
        return
    )
    .pipe(logger(
        before: 'Compling Vendor Javascript'
        after: 'Finished!'
        showChange: true))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
    return



gulp.task 'html', ->
    gulp.src('./assets/views/*.pug')
    .pipe(pug({}))
    .pipe(logger(
        before: 'Minifing HTML'
        after: 'Finished!'
        showChange: true))
        .pipe(gulp.dest('./docs'))
    return



gulp.task 'clean', ->
  del.sync [
    './docs/*'
    './assets/css/vendor/*'
    './assets/js/vendor/*'
  ], force: true
  return


gulp.task 'build', [
    'vendor_css'
    'vendor_js'
    'app_js'
    'html'
]

gulp.task 'default', [ 'build' ]
