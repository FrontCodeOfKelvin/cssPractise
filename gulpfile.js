var stylus = require('gulp-stylus'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin');

    
gulp.task('html', function () {
    return gulp.src(['src/**/*.html','*'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
         }));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/css/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
         }));
});

gulp.task('imagemin', function() {
    return gulp.src('src/**/images/*')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
 });

gulp.task('browserSync', function() {
    browserSync.init({
       server: {
          baseDir: 'dist'
       }
    })
 })

 gulp.task('default', ['html', 'stylus', 'imagemin', 'browserSync'], function (){
    gulp.watch('src/**/*.html', function(){
        gulp.run('html');
    });
    gulp.watch('src/**/css/*.styl', function() {
        gulp.run('stylus');
    });
    gulp.watch('src/**/images/*', function() {
        gulp.run('imagemin');
    });
 });