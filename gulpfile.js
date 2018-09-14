const gulp = require('gulp');
const gzip = require('gulp-gzip');
const minify = require('gulp-minify-css');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;

const [command, value] = (process.argv[2]) ? process.argv[2].split('='): '';
const src = (value) ? `./dist/${value}` : `./dist`;

gulp.task('pack-js', () => {	
  return gulp.src([`${src}/*.js`])
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest(`${src}`));
});

gulp.task('pack-css', () => {
  return gulp.src([`${src}/*.css`])
    .pipe(minify())
    .pipe(gzip())
    .pipe(gulp.dest(`${src}`));
});
 
gulp.task('clean', ['pack-js', 'pack-css'], () => {
  return gulp.src([`${src}/*.js`, `${src}/*.css`], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], () => {
});