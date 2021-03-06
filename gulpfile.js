var gulp = require('gulp'),
  connect = require('gulp-connect'),
	less = require('gulp-less'),
	includer = require('gulp-htmlincluder');
	// spritesmith = require('gulp.spritesmith');
//	cleanCSS = require('gulp-clean-css'),
//    htmlmin = require('gulp-htmlmin');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('less', function () {
  return gulp.src('dev/less/styles.main.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
	.pipe(connect.reload());
});

gulp.task('htmlIncluder', function() {
    gulp.src('dev/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('move', function () {
	gulp.src('dev/img/**/*.*')
	.pipe(gulp.dest('build/img/'))
	.pipe(connect.reload());

});
// gulp.task('sprite', function () {
//   var spriteData = gulp.src('dev/img/sprite/*.png').pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: 'sprite.css'
//   }));
//   return spriteData.pipe(gulp.dest('dev/img/sprite/'));
// });

//gulp.task('minify-css', function() {
//  return gulp.src('build/css/*.css')
//    .pipe(cleanCSS({compatibility: 'ie8'}))
//    .pipe(gulp.dest('build/css/*.css'));
//});
//
//gulp.task('minify', function() {
//  return gulp.src('build/*.html')
//    .pipe(htmlmin({collapseWhitespace: true}))
//    .pipe(gulp.dest('build'));
//});

gulp.task('default', function () {
  gulp.start('connect', 'less','htmlIncluder','move'),
	gulp.watch(['dev/less/**/*.less'], ['less']),
	gulp.watch(['dev/**/*.html'], ['htmlIncluder']),
	gulp.watch(['dev/img/**/*.*'], ['move']);
});
