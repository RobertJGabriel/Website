import gulp from 'gulp';
import pug from 'gulp-pug';
import config from '../../__core/settings/config.json';

config.basedir = __dirname;



module.exports = {
    html: function () {
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
    }
}