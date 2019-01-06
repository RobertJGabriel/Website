
import gulp from 'gulp';

import HubRegistry from 'gulp-hub';
var hub = new HubRegistry(['./project1/gulpfile.js', './project2/gulpfile.js']);
/* tell gulp to use the tasks just loaded */
gulp.registry(hub);


import del from 'del';
import pug from 'gulp-pug';

import config from './__core/settings/config.json';

config.basedir = __dirname;








gulp.task('html', () => {
  return gulp
    .src('./app/views/**/*.pug')
    .pipe(
      pug(
        config
      )
    )
    .on('error', err => {
      console.log(err.message)
    })
    .pipe(gulp.dest('./dist'))
})
