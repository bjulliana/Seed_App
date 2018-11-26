// Include gulp
let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sassLint     = require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer');

// Compile Sass
gulp.task('sass', function () {
	return gulp.src('css/scss/**/*.scss')
	           .pipe(sass().on('error', sass.logError))
	           .pipe(autoprefixer({
		           browsers: ['last 2 versions'],
		           cascade : false
	           }))
	           .pipe(gulp.dest('css'))
	           .pipe(browserSync.reload({
		           stream: true
	           }));
});

//Sass Lint task
gulp.task('sass-lint', function () {
	return gulp.src(['./css/**/*.s+(a|c)ss'])
	           .pipe(sassLint())
	           .pipe(sassLint.format())
	           .pipe(sassLint.failOnError());
});

//Test task
gulp.task('test', function () {
	gulp.start('sass-lint');
});

//Default task
gulp.task('default', function () {
    gulp.start('sass');
});

//Watch task
gulp.task('watch', ['sass'], function () {
	gulp.watch('css/scss/**/*.scss', ['sass']);
});