var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');



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
// gulp.task('devSever',function(){
//     return gulp.
// })


//监听
gulp.task('watch', function() {
    return gulp.watch('./sass/*.js', gulp.series('devCss'))
})

//环境
gulp.task('dev', gulp.series('minCss', 'minJs', 'watch'))