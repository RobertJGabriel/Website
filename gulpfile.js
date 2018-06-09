var glob = require('glob')
var del = require('del')
var gulp = require('gulp')
var hash = require('hash-files')
var jsesc = require('jsesc')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var gutil = require('gulp-util')
var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var htmlmin = require('gulp-htmlmin')
var pug = require('gulp-pug')
var concatCss = require('gulp-concat-css')
var uncss = require('postcss-uncss')
var imagemin = require('gulp-imagemin')
var watch = require('gulp-watch')
var csscomb = require('gulp-csscomb')
var webp = require('gulp-webp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence').use(gulp);
var cleanCss = require('gulp-clean-css');

/**
 * @param  {} 'serve'
 * @param  {} ['app_css'
 * @param  {} 'app_js']
 * @param  {} function(
 */
gulp.task('serve', ['app_css', 'app_js'], function () {
  browserSync.init({
    server: './docs'
  })
  gulp.watch('./app/assets/css/app/*.sass', ['app_css'])
  gulp.watch('./app/assets/js/app/*.js', ['app_js'])
  gulp.watch('./app/views/*.pug', ['html'])
  gulp.watch('./app/views/*.pug').on('change', browserSync.reload)
})


gulp.task('move_app_files', function () {
  gulp
    .src([
      './app/views/apps/**/*.*',
      '!./app/views/apps/**/*.pug'
    ])
    .pipe(gulp.dest('./docs/apps'))
})


gulp.task('vendor_css', function () {
  gulp
    .src([
      './app/assets/css/vendor/bootstrap.css',
      './app/assets/css/vendor/bootstrap-material-design.css'
    ])
    .pipe(concatCss('vendor.css'))
    .pipe(
      minifyCSS({
        keepSpecialComments: 0
      })
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./docs/assets/css'))
})

gulp.task('app_css', function () {
  gulp
    .src([
      './app/assets/css/app/__variables.sass',
      './app/assets/css/app/reset.sass',
      './app/assets/css/app/loading.sass',
      './app/assets/css/app/button.sass',
      './app/assets/css/app/app.sass',
      './app/assets/css/app/layout.sass',
      './app/assets/css/app/menu.sass',
      './app/assets/css/app/gallery.sass',
      './app/assets/css/app/story.sass',
      './app/assets/css/app/box.sass',
      './app/assets/css/app/imac.sass'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('app.css'))
    .pipe(csscomb())
    .pipe(minifyCSS())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./docs/assets/css'))
    .pipe(browserSync.stream())
})

gulp.task('final_css', function () {
  var plugins = [
    uncss({
      ignore: [
        '.open',
        '.sk-fading-circle',
        '.margin-right',
        '.hide',
        '.show',
        '.label',
        '.label-success',
        '.label-info',
        '.open',
        '.hide',
        '.show'
      ],
      html: ['index.html', 'docs/**/*.html', 'https://www.robertgabriel.ninja']
    })
  ]

  gulp
    .src('./docs/assets/css/**/*.min.css')
    .pipe(
      cleanCss({
        level: {
          2: {
            all: true, // sets all values to `false,
            removeUnusedAtRules: true, // controls unused at rule removing; defaults to false (available since 4.1.0)
            restructureRules: true,
            mergeSemantically: true
          }
        }
      })
    )
    .pipe(minifyCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./docs/assets/css/'))
})

gulp.task('app_js', function () {
  gulp
    .src('./app/assets/js/app/*.js')
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err))
    })
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./docs/assets/js'))
    .pipe(browserSync.stream())
})


gulp.task('app_js_vue', function () {
  gulp
    .src('./app/assets/js/app/vue/*.js')
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err))
    })
    .pipe(gulp.dest('./docs/assets/js/vue/'))
    .pipe(browserSync.stream())
})

gulp.task('vendor_js', function () {
  gulp
    .src(['./app/assets/js/vendor/jquery.js'])
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err.background_imagessage))
    })
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
})

gulp.task('webp_js', function () {
  gulp
    .src(['./app/assets/js/vendor/webpjs.js'])
    .on('error', function (err) {
      gutil.log(gutil.colors.red(err.background_imagessage))
    })
    .pipe(concat('webpjs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'))
})



gulp.task('build-settings', function () {
  gulp.src('./core/.nojekyll').pipe(gulp.dest('./docs/'))
})

gulp.task('build-downloads', function () {
  gulp
    .src('./app/assets/downloads/**/*.*')
    .pipe(gulp.dest('./docs/assets/downloads/'))
})

gulp.task('apple-pay', function () {
  gulp
    .src('./core/apple-developer-merchantid-domain-association')
    .pipe(gulp.dest('./docs/.well-known'))
})

gulp.task('extra', function () {
  gulp.src('./core/*').pipe(gulp.dest('./docs/'))
})

gulp.task('html', function () {
  gulp
    .src('./app/views/**/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .on('error', function (err) {
      console.log(err.message)
    })
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  gulp
    .src('./app/assets/img/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./docs/assets/img/'))
})

gulp.task('images-png', function () {
  gulp.src('./app/assets/img/**/*.png').pipe(gulp.dest('./docs/assets/img/'))
})

gulp.task('clean', function () {
  del.sync(['!./docs/CNAME', './docs/*'], {
    force: true
  })
})

var stringify = value => {
  return jsesc(value, {
    wrap: true,
    compact: false,
    indentLevel: 3
  })
}

var shortHash = files => {
  return hash
    .sync({
      files: files
    })
    .slice(0, 8)
}

var assets = ['docs/**/*.*']

gulp.task('cache', () => {
  var assets = [
    ...glob.sync('docs/assets/css/**/*.*'),
    ...glob.sync('docs/*.html'),
    ...glob.sync('docs/*.js'),
    ...glob.sync('docs/assets/img/**/me.png'),
    ...glob.sync('docs/assets/img/**/*.svg'),
    ...glob.sync('docs/assets/js/**/*.*')
  ]
  var assetsHash = shortHash(assets)
  var assetCacheList = [
    '/',
    ...assets
    // Remove all `images/icon-*` files except for the one used in
    // the HTML.
    .filter(
      path =>
      !path.includes('images/icon-') || path.includes('icon-228x228.png')
    )
    .map(path => path.replace(/^docs\//, '/'))
  ]

  gulp
    .src('./core/sw.js')
    .pipe(replace('%HASH%', stringify(assetsHash)))
    .pipe(replace('%CACHE_LIST%', stringify(assetCacheList)))
    .pipe(
      rename(path => {
        path.basename = assetsHash
      })
    )
    .pipe(gulp.dest('docs/'))

  gulp
    .src('docs/**/*.html')
    .pipe(
      replace(
        /(<\/body>)/g,
        `<script>
				  if ('serviceWorker' in navigator) {
					  navigator.serviceWorker.register('/${assetsHash}.js');
				  }
			  </script>$1`
      )
    )
    .pipe(gulp.dest('docs/'))

  return del(['docs/service-worker.js'])
})

gulp.task('build', [
  'vendor_css',
  'build-downloads',
  'vendor_js',
  'webp_js',
  'app_js',
  'app_css',
  'final_css',
  'images',
  'images-png',
  'app_js_vue',
  'extra',
  'apple-pay',
  'build-settings'
])

gulp.task('default', ['clean', 'build'])
