import gulp from 'gulp';
import glob from 'glob';
import del from 'del';
import hash from 'hash-files';
import jsesc from 'jsesc';
import rename from 'gulp-rename';
import replace from 'gulp-replace';


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
      .src('./__core/tasks/workers/sw.js')
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
  