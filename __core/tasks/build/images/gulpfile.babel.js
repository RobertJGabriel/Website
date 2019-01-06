gulp.task('images', () => {
    return gulp
      .src('./app/assets/img/**/*')
      .pipe(webp())
      .pipe(gulp.dest('./dist/assets/img/'))
  })
  
  gulp.task('images-png', () => {
    return gulp.src('./app/assets/img/**/*.png').pipe(gulp.dest('./dist/assets/img/'))
  })
  