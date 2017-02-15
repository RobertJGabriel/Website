var coffee = require('gulp-coffee');
var gulp = require('gulp');

gulp.task('coffee', function() {
  gulp.src('./assets/coffeescript/sorts.coffee')
    .pipe(coffee({
        bare: true
    }))
    .pipe(gulp.dest('./assets/js/'));
});