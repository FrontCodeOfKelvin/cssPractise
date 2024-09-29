// import imagemin from 'gulp-imagemin'

var stylus = require('gulp-stylus'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch');

gulp.task('html', function () {
    console.log('do html')
    return gulp.src(['src/**/*.html','*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
         }));
});

gulp.task('stylus', function () {   
    return gulp.src('src/**/css/*.styl')
        .pipe(stylus({'paths': [__dirname + '/src/0common/images', __dirname + '/src'],
            url: { name: 'url', limit: false }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
         }));
});

// gulp.task('imagemin', function() {
//     return gulp.src('src/**/images/*')
//         // .pipe(imagemin())
//         .pipe(gulp.dest('dist'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
//  });

gulp.task('browserSync', function() {
    browserSync.init({
       server: {
          baseDir: 'dist'
       },
       files:['**']
    })
 })


//  gulp.task('watch', function () {
//   watch('./src/**/*.html', function () {
//     gulp.start('html');	//执行html任务
//       // browserSync.reload(); //刷新浏览器
//   });
//   watch(['src/**/css/*.styl','src/0common/**/*'], function () {
//     gulp.start('stylus');	//执行html任务
//       // browserSync.reload(); //刷新浏览器
//   });
// });
gulp.task('watch', function () {
  console.log('do watch')
  return watch('./src/**/*.html', function () {
    console.log('do watch html')
      gulp.series('html')()
      // browserSync.reload(); //刷新浏览器
  });
});

 gulp.task('default', gulp.parallel('html', 'stylus', 'browserSync', 'watch'));
