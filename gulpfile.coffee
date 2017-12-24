gulp = require('gulp')
less = require('gulp-less')
gutil = require('gulp-util')
w3c = require('gulp-w3cjs')
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
webp = require('gulp-webp')
browserSync = require('browser-sync').create()
critical = require('critical').stream
uncss = require('gulp-uncss')
purify = require('gulp-purifycss')
runSequence = require('run-sequence').use(gulp)


gulp.task 'serve', [ 'app_css','app_js' ], ->
  browserSync.init server: './docs'
  gulp.watch './assets/css/app/*.scss', [ 'app_css' ]
  gulp.watch './assets/js/app/*.coffee', [ 'app_js' ]
  gulp.watch './assets/views/*.pug' ,['html']
  gulp.watch('./assets/views/*.pug').on 'change', browserSync.reload
  return




gulp.task 'vendor_css', ->
    gulp.src([
        'assets/css/vendor/bootstrap.css'
        'assets/css/vendor/font-awesome.css'
        'assets/css/vendor/bootstrap-material-design.css'
        'assets/css/vendor/fonts.css'
    ])
    .pipe(concatCss("vendor.css"))
    .pipe(minifyCSS(keepSpecialComments: 0))
    .pipe(rename(suffix: '.min'))
    .pipe gulp.dest('./docs/assets/css')
    return


gulp.task 'app_css', ->
    gulp.src([
        './assets/css/app/__variables.sass'
        './assets/css/app/reset.sass'
        './assets/css/app/button.sass'
        './assets/css/app/app.sass'
        './assets/css/app/layout.sass'
        './assets/css/app/material.sass'
        './assets/css/app/menu.sass'
        './assets/css/app/gallery.sass'
        './assets/css/app/story.sass'
        './assets/css/app/box.sass'
        ])
    .pipe sass().on('error', sass.logError)
    .pipe concatCss("app.css")
    .pipe csscomb()
    .pipe minifyCSS()
    .pipe rename suffix: '.min'
    .pipe gulp.dest('./docs/assets/css')
    .pipe browserSync.stream()
    return

gulp.task 'app_sw', ->
    gulp.src('assets/js/app/serviceWorker.coffee')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err)
        return
    )
    .pipe(coffee())
    .pipe(concat('serviceWorker.js'))
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'app_js', ->
    gulp.src('assets/js/app/*.coffee')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err)
        return
    )
    .pipe(coffee())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./docs/assets/js'))
    .pipe browserSync.stream()
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
        gutil.log gutil.colors.red(err.background_imagessage)
        return
    )
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
    return

gulp.task 'fonts', ->
    gulp.src('./assets/fonts/*')
    .pipe(gulp.dest('./docs/assets/fonts/'))
    return

gulp.task 'cname', ->
    gulp.src('./assets/CNAME')
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'json', ->
    gulp.src('./assets/*.json')
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'extra', ->
    gulp.src('./assets/extra/*')
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'html', ->
    gulp.src('./assets/views/*.pug')
    .pipe(pug({}))
    #.pipe(w3c())
    #.pipe(w3c.reporter())
    .pipe(gulp.dest('./docs'))
    .pipe browserSync.stream()
    return


gulp.task 'images', ->
  gulp.src('./assets/img/**/*')
  .pipe(webp())
  .pipe(gulp.dest('./docs/assets/img/'))

  return

gulp.task 'images-png', ->
  gulp.src('./assets/img/**/*.png')
  .pipe(gulp.dest('./docs/assets/img/'))

  return

gulp.task 'clean', ->
  del.sync [
    './docs/*'
  ], force: true
  return


gulp.task 'build', [
    'vendor_css'
    'vendor_js'
    'app_js'
    'app_css'
    'fonts'
    'images'
    'images-png'
    'cname'
    'app_sw'
    'extra'
    'json'

]

gulp.task 'default', [ 'clean','build' ]
