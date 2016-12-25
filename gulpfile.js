var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var logger = require('gulp-logger');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-html-minifier');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var critical = require('critical').stream;
var sitemap = require('gulp-sitemap');
var pug = require('gulp-pug');
var coffee = require('gulp-coffee');
var clean = require('gulp-clean');


gulp.task('less', function() {
    gulp.src('./assets/less/styles.less')
        .pipe(less()
            .on('error', gutil.log)
            .on('error', gutil.beep)
            .on('error', function(err) {
                console.log('err', err);
                var pathToFile = err.fileName.split('\\');
                file = pathToFile[pathToFile.length - 1];
            })
        )
        .pipe(minifyCSS({
            keepSpecialComments: 1
        }))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('./dist/css/'));
});






gulp.task('fonts', function() {
    return gulp.src([
            './assets/fonts/*',
        ])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('downloads', function() {
    return gulp.src([
            './assets/downloads/*/**',
        ])
        .pipe(gulp.dest('./dist/downloads/'));
});


gulp.task('thirdParty', function() {
    return gulp.src([
            './assets/js/vendor/jquery.js',
            './assets/js/vendor/bootstrap.js',
            './assets/js/vendor/material.js',
            './assets/js/vendor/ripples.js',
            './assets/js/vendor/cheet.js',
            './assets/js/vendor/holder.js',
            './assets/js/app/core.js',
            './assets/js/app/main.js'
        ])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('images', function() {
    return gulp.src('assets/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


gulp.task('clean', function(cb) {


    return gulp.src([
            'dist/',
            '*.html',
            '!/googlea4b2e0ff05c168d5.html',
            '!gulpfile.js',
            '!CNAME',
            '!robots.txt',
            '!sitemap.xml',
            '!README.md',
            './assets/js/app/core.js',
            './assets/js/app/main.js'
        ], {
            read: false
        })
        .pipe(clean());

});


gulp.task('sitemap', function() {
    gulp.src('./*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://robertgabriel.ninja',
            priority: 1.0,
            changefreq: 'weekly'
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('views', function() {


    gulp.src('./assets/view/*.pug')
        .pipe(pug({
            // Your options in here.
        }))
        .pipe(critical({
            base: './',
            inline: true,
            minify: true,
            width: 1300,
            height: 900,
            css: ['./dist/css/styles.min.css']
        }))
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
        })
        .pipe(gulp.dest('./'));
});


gulp.task('coffee', function() {
    gulp.src('./assets/js/app/*.coffee')
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./assets/js/app/'));
});

// Default Task
gulp.task('default', function(callback) {
    runSequence('clean', 'images', 'less', 'fonts', 'downloads', 'coffee', 'thirdParty', 'views', 'sitemap', callback);
});
