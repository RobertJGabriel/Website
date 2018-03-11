


const glob = require('glob');
const del = require('del');
const gulp = require('gulp');
const hash = require('hash-files');
const jsesc = require('jsesc');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const gutil = require('gulp-util');
const w3c = require('gulp-w3cjs');
const minifyCSS = require('gulp-minify-css');
const chalk = require('chalk');
const logger = require('gulp-logger');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const rollup = require('gulp-rollup');
const concatCss = require('gulp-concat-css');
const coffee = require('gulp-coffee');
const uncss = require('gulp-uncss');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const csscomb = require('gulp-csscomb');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const critical = require('critical').stream;
const purify = require('gulp-purifycss');
const runSequence = require('run-sequence').use(gulp);
const jsonminify = require('gulp-jsonminify');

gulp.task('serve', ['app_css', 'app_js'], function () {
  browserSync.init({
    server: './docs'
  });
  gulp.watch('./app/assets/css/app/*.sass', ['app_css']);
  gulp.watch('./app/assets/js/app/*.coffee', ['app_js']);
  gulp.watch('./app/views/*.pug', ['html']);
  gulp.watch('./app/views/*.pug').on('change', browserSync.reload);
});

gulp.task('vendor_css', function () {
  gulp.src(['./app/assets/css/vendor/bootstrap.css', './app/assets/css/vendor/font-awesome.css', './app/assets/css/vendor/bootstrap-material-design.css', './app/assets/css/vendor/material-icons.css']).pipe(concatCss("vendor.css")).pipe(minifyCSS({
    keepSpecialComments: 0
  })).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('./docs/assets/css'));
});

gulp.task('app_css', function () {
  gulp.src(['./app/assets/css/app/__variables.sass', './app/assets/css/app/reset.sass', './app/assets/css/app/timeline.sass', './app/assets/css/app/button.sass', './app/assets/css/app/app.sass', './app/assets/css/app/layout.sass', './app/assets/css/app/material.sass', './app/assets/css/app/menu.sass', './app/assets/css/app/gallery.sass', './app/assets/css/app/story.sass', './app/assets/css/app/box.sass']).pipe(sass().on('error', sass.logError)).pipe(concatCss("app.css")).pipe(csscomb()).pipe(minifyCSS()).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('./docs/assets/css')).pipe(browserSync.stream());
});

gulp.task('app_sw', function () {
  gulp.src('./app/assets/js/app/serviceWorker.coffee').on('error', function (err) {
    gutil.log(gutil.colors.red(err));
  }).pipe(coffee()).pipe(concat('serviceWorker.js')).pipe(gulp.dest('./docs/'));
});

gulp.task('app_js', function () {
  gulp.src('./app/assets/js/app/*.coffee').on('error', function (err) {
    gutil.log(gutil.colors.red(err));
  }).pipe(coffee()).pipe(concat('app.min.js')).pipe(gulp.dest('./docs/assets/js')).pipe(browserSync.stream());
});

gulp.task('vendor_js', function () {
  gulp.src(['./app/assets/js/vendor/jquery.js', './app/assets/js/vendor/tether.js', './app/assets/js/vendor/bootstrap.min.js', './app/assets/js/vendor/material.js', './app/assets/js/vendor/ripples.js', './app/assets/js/vendor/cheet.min.js']).on('error', function (err) {
    gutil.log(gutil.colors.red(err.background_imagessage));
  }).pipe(concat('vendor.min.js')).pipe(uglify()).pipe(gulp.dest('./docs/assets/js/'));
});

gulp.task('webp_js', function () {
  gulp.src(['./app/assets/js/vendor/webpjs.js']).on('error', function (err) {
    gutil.log(gutil.colors.red(err.background_imagessage));
  }).pipe(concat('webpjs.min.js')).pipe(uglify()).pipe(gulp.dest('./docs/assets/js/'));
});

gulp.task('fonts', function () {
  gulp.src('./app/assets/fonts/*').pipe(gulp.dest('./docs/assets/fonts/'));
});

gulp.task('cname', function () {
  gulp.src('./app/assets/CNAME').pipe(gulp.dest('./docs/'));
});

gulp.task('apple-pay', function () {
  gulp.src('./app/assets/apple-developer-merchantid-domain-association').pipe(gulp.dest('./docs/.well-known'));
});

gulp.task('json', function () {
  gulp.src('./app/assets/*.json').pipe(jsonminify()).pipe(gulp.dest('./docs/'));
});

gulp.task('extra', function () {
  gulp.src('./app/assets/extra/*').pipe(jsonminify()).pipe(gulp.dest('./docs/'));
});

gulp.task('html', function () {
  gulp.src('./app/views/*.pug').pipe(pug({
    pretty: true
  })).pipe(gulp.dest('./docs')).pipe(browserSync.stream());
});

gulp.task('images', function () {
  gulp.src('./app/assets/img/**/*').pipe(webp()).pipe(gulp.dest('./docs/assets/img/'));
});

gulp.task('images-png', function () {
  gulp.src('./app/assets/img/**/*.png').pipe(gulp.dest('./docs/assets/img/'));
});

gulp.task('clean', function () {
  del.sync(['!./docs/CNAME', './docs/*'], {
    force: true
  });
});

const stringify = value => {
  return jsesc(value, {
    wrap: true,
    compact: false,
    indentLevel: 3,
  });
};

const shortHash = files => {
  return hash.sync({
    files: files
  }).slice(0, 8);
};

const assets = [
  'docs/**/*.*'
];


gulp.task('cache', () => {

  const assets = [
    ...glob.sync('docs/assets/fonts/**/*.*'),
    ...glob.sync('docs/assets/fonts/**/*.*'),
    ...glob.sync('docs/assets/images/**/*.svg'),
    ...glob.sync('docs/assets/js/**/*.*'),
  ];
  const assetsHash = shortHash(assets);
  const assetCacheList = [
    '/',
    ...assets
    // Remove all `images/icon-*` files except for the one used in
    // the HTML.
    .filter(path => !path.includes('images/icon-') || path.includes('icon-228x228.png'))
    .map(path => path
      .replace(/^docs\//, '/')),
  ];

  gulp.src('./core/sw.js')
    .pipe(replace(
      '%HASH%',
      stringify(assetsHash)
    ))
    .pipe(replace(
      '%CACHE_LIST%',
      stringify(assetCacheList)
    ))
    .pipe(rename(path => {
      path.basename = assetsHash;
    }))
    .pipe(gulp.dest('docs/'));

  gulp.src('docs/**/*.html')
    .pipe(replace(
      /(<\/body>)/g,
      `<script>
				  if ('serviceWorker' in navigator) {
					  navigator.serviceWorker.register('${ assetsHash }.js');
				  }
			  </script>$1`
    ))
    .pipe(gulp.dest('docs/'));

  return del([
    'docs/service-worker.js',
  ]);
});



gulp.task('build', ['vendor_css', 'vendor_js', 'webp_js', 'app_js', 'app_css', 'fonts', 'images', 'images-png', 'cname', 'app_sw', 'extra', 'json', 'apple-pay']);

gulp.task('default', ['clean', 'build']);
