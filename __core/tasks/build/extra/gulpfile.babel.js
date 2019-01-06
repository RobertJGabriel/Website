gulp.task('move_app_files', () => {
  return gulp
    .src([
      './app/views/apps/**/*.*',
      '!./app/views/apps/**/*.pug'
    ])
    .pipe(gulp.dest('./dist/apps'));
});



gulp.task('clean', () => {
  del.sync(['!./dist/CNAME', './dist/*'], {
    force: true
  })
})


gulp.task('build-downloads', () => {
  return gulp
    .src('./app/assets/downloads/**/*.*')
    .pipe(gulp.dest('./dist/assets/downloads/'));
});

gulp.task('extra', () => {
  return gulp.src('./__core/files/*').pipe(gulp.dest('./dist/'))
})