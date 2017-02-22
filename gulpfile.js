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

gulp.task('less', function(done) {
    gulp.src('./assets/less/styles.less')
        .pipe(less())
        .pipe(logger({
            before: 'Coverting Less to Css ',
            after: 'Finished!',
            extname: '.min.css',
            showChange: true
        }))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(size());
    done();
});


gulp.task('fonts', function(done) {
    gulp.src([
            './assets/fonts/*',
        ])
        .pipe(logger({
            before: 'Moving Fonts',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(gulp.dest('./dist/fonts/')).pipe(size());
    done();
});

gulp.task('downloads', function(done) {
    gulp.src([
            './assets/downloads/*/**',
        ]).pipe(logger({
            before: 'Moving Downloads',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(gulp.dest('./dist/downloads/')).pipe(size());
    done();
});


gulp.task('thirdParty', function(done) {
    gulp.src([
            './assets/js/vendor/jquery.js',
            './assets/js/vendor/bootstrap.js',
            './assets/js/vendor/material.js',
            './assets/js/vendor/ripples.js',
            './assets/js/vendor/cheet.js',
            './assets/js/app/core.js',
            './assets/js/app/main.js'
        ]).on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
        })
        .pipe(logger({
            before: 'Compling Javascript',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(size());
    done();
});


gulp.task('images', function(done) {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(logger({
            before: 'Compressing Images',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(size());
    done();
});


gulp.task('clean', function(done) {
    del.sync([
        './dist/downloads/*',
        '!./dist/css/*',
        '!sorting-algorithms-coffeescript.html',
        './dist/fonts/*',
        './dist/img/*',
        './dist/js/*',
        '*.html',
        '!gulpfile.js',
        '!CNAME',
        '!robots.txt',
        '!sitemap.xml',
        '!README.md'
    ], {
        force: true
    });

    done();

});


gulp.task('sitemap', function(done) {
    gulp.src('*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://robertgabriel.ninja',
            priority: 1.0,
            changefreq: 'weekly'
        }))
        .pipe(logger({
            before: 'Creating Sitemap',
            after: 'Finished!',
            showChange: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(size());
    done();
});


gulp.task('html', function(done) {
    gulp.src('assets/view/*.pug')
        .pipe(pug({}))
        .pipe(critical({
            base: __dirname,
            css: [__dirname + '/dist/css/styles.min.css'],
            inline: true,
            minify: true,
            inlineImages: true,
            include: [ /^\.navbar-nav/, /^\.navbar/, /^\.navbar-nav/,/^\.menu-bar/],
            css: [__dirname + '/dist/css/styles.min.css'],
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
    done();
});


gulp.task('coffee', function(done) {
    gulp.src('./assets/js/app/*.coffee')
        .pipe(coffee({}).on('error', gutil.log))
        .pipe(gulp.dest('assets/js/app/')).pipe(size());
    done();
});




gulp.task('default', gulp.series('clean', 'coffee', 'less', 'fonts', 'downloads', 'sitemap', 'images', 'html', 'thirdParty', function(done) {
    done();
}));