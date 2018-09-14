const gulp = require('gulp');
const gzip = require('gulp-gzip');
const minify = require('gulp-minify-css');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-string-replace');

const [command, value] = (process.argv[2]) ? process.argv[2].split('='): '';
const src = (value) ? `./dist/${value}` : `./dist`;

gulp.task('pack-js', () => {	
  return gulp.src([`${src}/*.js`])
    .pipe(uglify())
    .pipe(gulp.dest(`${src}`));
});

gulp.task('pack-css', () => {
  return gulp.src([`${src}/*.css`])
    .pipe(minify())
    .pipe(gulp.dest(`${src}`));
});

gulp.task('pack-index-html', () => {
  return gulp.src([`${src}/index.html`])
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(replace(new RegExp('script ', 'g'), 'script async '))
    .pipe(gulp.dest(`${src}`));
});

gulp.task('gzip', gulp.series('pack-js', 'pack-css', 'pack-index-html', () => {
  return gulp.src([`${src}/*.js`, `${src}/*.css`, `${src}/*.html`])
    .pipe(gzip({ gzipOptions: { level: 9 }, skipGrowingFiles : true }))
    .pipe(gulp.dest(`${src}`));
}));

gulp.task('clean', gulp.series('gzip', () => {
  return gulp.src([`${src}/*.js`, `${src}/*.css`, `${src}/*.html`], {read: false})
    .pipe(clean());
}));

gulp.task('default', gulp.parallel('clean'));
