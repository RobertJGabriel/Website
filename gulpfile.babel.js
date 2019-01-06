
import gulp from 'gulp';
import HubRegistry from 'gulp-hub';
import config from './__core/settings/config.json';
config.basedir = __dirname;
var hub = new HubRegistry(['./project1/gulpfile.js', './project2/gulpfile.js']);
/* tell gulp to use the tasks just loaded */
gulp.registry(hub);












gulp.task('build', gulp.series(
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
  'extra'
))

gulp.task('default', gulp.parallel('clean', 'build'))