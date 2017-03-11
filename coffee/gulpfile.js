var coffee = require('gulp-coffee');
var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var critical = require('critical').stream;
var sitemap = require('gulp-sitemap');
var pug = require('gulp-pug');
var coffee = require('gulp-coffee');
var del = require('del');
var size = require('gulp-size');
var logger = require('gulp-logger');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');



gulp.task('sass', function () {
    return gulp.src('./assets/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'));

});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('html', function() {
    gulp.src('assets/views/*.pug')
        .pipe(pug({}))
        .pipe(critical({
            base: __dirname,
            css: [__dirname + '/dist/css/bootstrap.css'],
            inline: true,
            minify: true,
            inlineImages: true,
            include: [ /^\.navbar-nav/, /^\.navbar/, /^\.navbar-nav/,/^\.menu-bar/,/^\.me/,/^\.row/],
            ignore: ['font-face', 'keyframes', /^\keyframes/]
        }))
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
        })
        .pipe(logger({
            before: 'Minifing HTML',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(size());

});


gulp.task('thirdParty', function(done) {
    gulp.src([
            './assets/js/vendor/jquery.min.js',
            './assets/js/vendor/bootstrap.js',
            './assets/js/vendor/material.js',
            './assets/js/vendor/ripples.js',
        ]).on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
        })
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(size());
    done();
});


gulp.task('fonts', function() {
    gulp.src('./assets/fonts/*').on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
        })

        .pipe(gulp.dest('./dist/fonts/'))
        .pipe(size());

});



gulp.task('default',  function(callback) {
		runSequence('thirdParty','fonts', 'sass', 'html', callback);
});







