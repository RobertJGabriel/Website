import gulp from 'gulp';
import requireDir from 'require-dir';
import config from './__core/settings/config.json';

const TASKS = requireDir('./__core/tasks/');

config.basedir = __dirname;

gulp.task('build', gulp.series(
  TASKS.css.vendor_css,
  TASKS.extra.build_downloads,
  TASKS.javascript.vendor_js,
  TASKS.javascript.webp_js,
  TASKS.javascript.app_js,
  TASKS.css.app_css,
  TASKS.css.final_css,
  TASKS.images.images,
  TASKS.images.images_png,
  TASKS.javascript.app_js_vue,
  TASKS.extra.extra,
  TASKS.html.html, 
  TASKS.sw.cache
));