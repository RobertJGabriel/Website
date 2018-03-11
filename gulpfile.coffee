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
jsonminify = require('gulp-jsonminify')

gulp.task 'serve', [ 'app_css', 'app_js' ] , ->
  browserSync.init {
    server: './docs'
  }
  gulp.watch './app/assets/css/app/*.sass', [ 'app_css' ]
  gulp.watch './app/assets/js/app/*.coffee', [ 'app_js' ]
  gulp.watch './app/views/*.pug' , ['html']
  gulp.watch('./app/views/*.pug').on 'change', browserSync.reload
  return

gulp.task 'vendor_css', ->
  gulp.src([
      './app/assets/css/vendor/bootstrap.css'
      './app/assets/css/vendor/font-awesome.css'
      './app/assets/css/vendor/bootstrap-material-design.css'
      './app/assets/css/vendor/material-icons.css'
  ])
  .pipe(concatCss("vendor.css"))
  .pipe(minifyCSS(keepSpecialComments: 0))

  .pipe(rename(suffix: '.min'))
  .pipe gulp.dest('./docs/assets/css')
  return


gulp.task 'app_css', ->
    gulp.src([
        './app/assets/css/app/__variables.sass'
        './app/assets/css/app/reset.sass'
        './app/assets/css/app/timeline.sass'
        './app/assets/css/app/button.sass'
        './app/assets/css/app/app.sass'
        './app/assets/css/app/layout.sass'
        './app/assets/css/app/material.sass'
        './app/assets/css/app/menu.sass'
        './app/assets/css/app/gallery.sass'
        './app/assets/css/app/story.sass'
        './app/assets/css/app/box.sass'
        ])
    .pipe sass().on('error', sass.logError)
    .pipe concatCss("app.css")

    .pipe csscomb()
    .pipe minifyCSS()
    .pipe rename {
        suffix: '.min'
    }
    .pipe gulp.dest('./docs/assets/css')
    .pipe browserSync.stream()
    return

gulp.task 'app_sw', ->
    gulp.src('./app/assets/js/app/serviceWorker.coffee')
    .on('error', (err) ->
        gutil.log gutil.colors.red(err)
        return
    )
    .pipe(coffee())
    .pipe(concat('serviceWorker.js'))
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'app_js', ->
    gulp.src('./app/assets/js/app/*.coffee')
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
        './app/assets/js/vendor/jquery.js',
        './app/assets/js/vendor/tether.js',
        './app/assets/js/vendor/bootstrap.min.js',
        './app/assets/js/vendor/material.js',
        './app/assets/js/vendor/ripples.js',
        './app/assets/js/vendor/cheet.min.js'
        ]
    ).on('error', (err) ->
        gutil.log gutil.colors.red(err.background_imagessage)
        return
    )
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
    return

gulp.task 'webp_js', ->
    gulp.src( [
        './app/assets/js/vendor/webpjs.js'
        ]
    ).on('error', (err) ->
        gutil.log gutil.colors.red(err.background_imagessage)
        return
    )
    .pipe(concat('webpjs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
    return





gulp.task 'fonts', ->
    gulp.src('./app/assets/fonts/*')
    .pipe(gulp.dest('./docs/assets/fonts/'))
    return

gulp.task 'cname', ->
    gulp.src('./app/assets/CNAME')
    .pipe(gulp.dest('./docs/'))
    return


gulp.task 'apple-pay', ->
    gulp.src('./app/assets/apple-developer-merchantid-domain-association')
    .pipe(gulp.dest('./docs/.well-known'))
    return


gulp.task 'json', ->
    gulp.src('./app/assets/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'extra', ->
    gulp.src('./app/assets/extra/*')
    .pipe(jsonminify())
    .pipe(gulp.dest('./docs/'))
    return

gulp.task 'html', ->
    gulp.src('./app/views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    #.pipe(w3c())
    #.pipe(w3c.reporter())
    .pipe(gulp.dest('./docs'))
    .pipe browserSync.stream()
    return


gulp.task 'images', ->
  gulp.src('./app/assets/img/**/*')
  .pipe(webp())
  .pipe(gulp.dest('./docs/assets/img/'))
  return


gulp.task 'images-png', ->
  gulp.src('./app/assets/img/**/*.png')
  .pipe(gulp.dest('./docs/assets/img/'))
  return


gulp.task 'clean', ->
  del.sync [
    '!./docs/CNAME'
    './docs/*'
  ], {
    force: true
  }
  return


gulp.task 'build', [
    'vendor_css'
    'vendor_js'
    'webp_js'
    'app_js'
    'app_css'
    'fonts'
    'images'
    'images-png'
    'cname'
    'app_sw'
    'extra'
    'json'
    'apple-pay'
]

gulp.task 'default', [ 'clean', 'build' ]
