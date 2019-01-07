import gulp from 'gulp';
import requireDir from 'require-dir';

import config from './__core/settings/config.json';
var tasks = requireDir('./__core/tasks/');

config.basedir = __dirname;

gulp.task('build', gulp.series(
  tasks.css.vendor_css,
  tasks.extra.build_downloads,
  tasks.javascript.vendor_js,
  tasks.javascript.webp_js,
  tasks.javascript.app_js,
  tasks.css.app_css,
  tasks.css.final_css,
  tasks.images.images,
  tasks.images.images_png,
  tasks.javascript.app_js_vue,
  tasks.extra.extra,
  tasks.html.html, 
  tasks.sw.cache
));


gulp.task('cache', gulp.series(  tasks.sw.cache));