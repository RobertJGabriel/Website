import glob from 'glob';
import del from 'del';
import gulp from 'gulp';
import hash from 'hash-files';
import jsesc from 'jsesc';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import concatCss from 'gulp-concat-css';
import webp from 'gulp-webp';
import cleanCss from 'gulp-clean-css';


gulp.task('move_app_files', () => {
  gulp
    .src([
      './app/views/apps/**/*.*',
      '!./app/views/apps/**/*.pug'
    ])
    .pipe(gulp.dest('./dist/apps'))
});


gulp.task('vendor_css', () => {
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
    .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('app_css', () => {
  gulp
    .src('./app/assets/css/app/styles.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('app.css'))
    .pipe(minifyCSS())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./dist/assets/css'))

});

gulp.task('final_css', () => {
  gulp
    .src('./dist/assets/css/**/*.min.css')
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
    .pipe(gulp.dest('./dist/assets/css/'))
})

gulp.task('app_js', () => {
  gulp
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
  gulp
    .src('./app/assets/js/app/vue/*.js')
    .on('error', err => {
      gutil.log(gutil.colors.red(err))
    })
    .pipe(gulp.dest('./dist/assets/js/vue/'))
})

gulp.task('vendor_js', () => {
  gulp
    .src(['./app/assets/js/vendor/vue.js'])
    .on('error', err => {
      gutil.log(gutil.colors.red(err.background_imagessage))
    })
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'))
})

gulp.task('webp_js', () => {
  gulp
    .src(['./app/assets/js/vendor/webpjs.js'])
    .on('error', err => {
      gutil.log(gutil.colors.red(err.background_imagessage))
    })
    .pipe(concat('webpjs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'))
})



gulp.task('build-settings', () => {
  gulp.src('./__core/.nojekyll').pipe(gulp.dest('./dist/'))
})

gulp.task('build-downloads', () => {
  gulp
    .src('./app/assets/downloads/**/*.*')
    .pipe(gulp.dest('./dist/assets/downloads/'))
})

gulp.task('apple-pay', () => {
  gulp
    .src('./__core/apple-developer-merchantid-domain-association')
    .pipe(gulp.dest('./dist/.well-known'))
})

gulp.task('extra', () => {
  gulp.src('./__core/*').pipe(gulp.dest('./dist/'))
})

gulp.task('html', () => {
  gulp
    .src('./app/views/**/*.pug')
    .pipe(
      pug({
        basedir: __dirname,
        pretty: true
      })
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest('./dist'))
})

gulp.task('images', () => {
  gulp
    .src('./app/assets/img/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./dist/assets/img/'))
})

gulp.task('images-png', () => {
  gulp.src('./app/assets/img/**/*.png').pipe(gulp.dest('./dist/assets/img/'))
})

gulp.task('clean', () => {
  del.sync(['!./dist/CNAME', './dist/*'], {
    force: true
  })
})

const stringify = value => {
  return jsesc(value, {
    wrap: true,
    compact: false,
    indentLevel: 3
  })
};

const shortHash = files => {
  return hash
    .sync({
      files
    })
    .slice(0, 8)
};

const assets = ['dist/**/*.*'];

gulp.task('cache', () => {
  const assets = [
    ...glob.sync('dist/assets/css/**/*.*'),
    ...glob.sync('dist/*.html'),
    ...glob.sync('dist/*.js'),
    ...glob.sync('dist/assets/img/**/me.png'),
    ...glob.sync('dist/assets/img/**/*.svg'),
    ...glob.sync('dist/assets/js/**/*.*')
  ];
  const assetsHash = shortHash(assets);
  const assetCacheList = [
    '/',
    ...assets
    // Remove all `images/icon-*` files except for the one used in
    // the HTML.
    .filter(
      path =>
      !path.includes('images/icon-') || path.includes('icon-228x228.png')
    )
    .map(path => path.replace(/^dist\//, '/'))
  ];

  gulp
    .src('./__core/sw.js')
    .pipe(replace('%HASH%', stringify(assetsHash)))
    .pipe(replace('%CACHE_LIST%', stringify(assetCacheList)))
    .pipe(
      rename(path => {
        path.basename = assetsHash
      })
    )
    .pipe(gulp.dest('dist/'))

  gulp
    .src('dist/**/*.html')
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
    .pipe(gulp.dest('dist/'))

  return del(['dist/service-worker.js'])
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