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
uncss = require('gulp-uncss')
imagemin = require('gulp-imagemin')
watch = require('gulp-watch')
csscomb = require('gulp-csscomb')

gulp.task 'vendor_css', ->
    gulp.src([
        'assets/css/vendor/bootstrap.css'
        'assets/css/vendor/font-awesome.css'
        'assets/css/vendor/bootstrap-material-design.css'
        'assets/css/vendor/material-icons.css'
        'assets/css/vendor/ripples.css'
    ])
    .pipe(concatCss("vendor.css"))
    .pipe(minifyCSS(keepSpecialComments: 0))
    .pipe(logger(
        before: 'Compressing Css '
        after: 'Compressing finished!'
        extname: '.min.css'
        showChange: true))
    .pipe(rename(suffix: '.min'))
    .pipe gulp.dest('./docs/assets/css')
    return


gulp.task 'app_css', ->
    gulp.src([
        './assets/css/app/app.sass'
        './assets/css/app/layout.sass'
        './assets/css/app/material.sass'
        './assets/css/app/menu.sass'
        './assets/css/app/gallery.sass'
        './assets/css/app/story.sass'
        ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss("app.css"))
    .pipe(csscomb())
    .pipe(minifyCSS())
    .pipe(rename(suffix: '.min'))
    .pipe gulp.dest('./docs/assets/css')
    return


gulp.task 'app_js', ->
    gulp.src('assets/js/app/*.coffee')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err.message)
        return
    ).pipe(logger(
        before: 'Compling App Javascript'
        after: 'Finished!'
        showChange: true))
    .pipe(coffee())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./docs/assets/js'))
    return


gulp.task 'vendor_js', ->
    gulp.src( [
        'assets/js/vendor/jquery.js',
        'assets/js/vendor/tether.js',
        'assets/js/vendor/bootstrap.min.js',
        'assets/js/vendor/material.js',
        'assets/js/vendor/ripples.js',
        'assets/js/vendor/cheet.min.js'
        ]
    ).on('error', (err) ->
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

gulp.task 'fonts', ->
    gulp.src('./assets/fonts/*')
    .pipe(logger(
        before: 'Moving Fonts'
        after: 'Finished!'
        showChange: true))
    .pipe(gulp.dest('./docs/assets/fonts/'))
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


gulp.task 'images', ->
  gulp.src('./assets/img/**/*')
  .pipe(imagemin())
  .pipe(logger(
    before: 'Compressing Images'
    after: 'Finished!'
    showChange: true))
  .pipe(gulp.dest('./docs/assets/img/'))

  return

gulp.task 'clean', ->
  del.sync [
    './docs/*'
  ], force: true
  return


gulp.task 'stream', ->
  watch('css/**/*.css', ignoreInitial: false)
  .pipe gulp.dest('build')
  return



gulp.task 'build', [
    'vendor_css'
    'vendor_js'
    'app_js'
    'app_css'
    'fonts'
    'images'
    'html'
]

gulp.task 'default', [ 'clean','build' ]
