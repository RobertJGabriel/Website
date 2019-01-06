import gulp from 'gulp';
import webp from 'gulp-webp';



module.exports = {
  images: function () {
    return gulp
      .src('./app/assets/img/**/*')
      .pipe(webp())
      .pipe(gulp.dest('./dist/assets/img/'))
  },
  images_png: function () {
    return gulp.src('./app/assets/img/**/*.png').pipe(gulp.dest('./dist/assets/img/'))
  }
}