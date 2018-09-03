var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');


//编译sass,压缩css
gulp.task('devCss', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./css'))
})

//压缩js
gulp.task('minJs', function() {
    return gulp.src(['./js/**/*.js', '!./js/libs/*.js'])
        .pipe(gulp.dest('./build'))
})

//启服务
gulp.task('devServer', function() {
    return gulp.server({
        port: 2020,
        middleware: function(req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if (pathname === '/favicon.ico') {
                res.end('');
                return
            };

            if (pathname === '/') {
                res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
            }
        }
    })
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./sass/*.js', gulp.series('devCss'))
})

//环境
gulp.task('dev', gulp.series('minCss', 'minJs', 'watch'))