import del from 'del';
import gulp from 'gulp';




module.exports = {
  move_app_files: function () {
    return gulp
      .src([
        '../../app/views/apps/**/*.*',
        '!../../app/views/apps/**/*.pug'
      ])
      .pipe(gulp.dest('./dist/apps'));
  },
  clean: function () {
    return del.sync(['!../../dist/CNAME', '../../dist/*'], {
      force: true
    });
  },
  build_downloads: function () {
    return gulp
      .src('../../app/assets/downloads/**/*.*')
      .pipe(gulp.dest('../../dist/assets/downloads/'));
  },
  extra: function () {
    return gulp.src('../../__core/files/*').pipe(gulp.dest('../../dist/'))
  }

};
