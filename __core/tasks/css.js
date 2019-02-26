import gulp from 'gulp';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import concatCss from 'gulp-concat-css';
import cleanCss from 'gulp-clean-css';


module.exports = {
    vendor_css: function () {

        return gulp
            .src([
                './app/assets/css/vendor/bootstrap.css',
                './app/assets/css/vendor/bootstrap-material-design.css'
            ])
            .pipe(concatCss('vendor.css'))
            .pipe(
                minifyCSS({
                    keepSpecialComments: 0
                })
            )
            .pipe(
                rename({
                    suffix: '.min'
                })
            )
            .pipe(gulp.dest('./dist/assets/css'));
    },

    app_css: function () {
        return gulp
            .src('./app/assets/css/app/styles.sass')
            .pipe(sass().on('error', sass.logError))
            .pipe(concatCss('app.css'))
            .pipe(minifyCSS())
            .pipe(
                rename({
                    suffix: '.min'
                })
            )
            .pipe(gulp.dest('./dist/assets/css'));
    },
    final_css: function () {
        return gulp
            .src('./dist/assets/css/**/*.min.css')
            .pipe(
                cleanCss({
                    level: {
                        2: {
                            all: true, // sets all values to `false,
                            removeUnusedAtRules: true, // controls unused at rule removing; defaults to false (available since 4.1.0)
                            restructureRules: true,
                            mergeSemantically: true
                        }
                    }
                })
            )
            .pipe(minifyCSS())
            .pipe(concat('styles.min.css'))
            .pipe(gulp.dest('./dist/assets/css/'));
    }
}