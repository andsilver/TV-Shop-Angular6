const gulp = require('gulp');
const gzip = require('gulp-gzip');
const minify = require('gulp-minify-css');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');

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

gulp.task('remove-index', () => {
  gulp.src(`${src}/index.html`, {read: false})
    .pipe(clean());
});

gulp.task('pack-main-html', ['remove-index'], () => {

  return gulp.src(['src/main.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`${src}/index.html`));
});

gulp.task('gzip', ['pack-js', 'pack-css', 'pack-main-html'], () => {
  return gulp.src([`${src}/*.*`])
    .pipe(gzip({ gzipOptions: { level: 9 }, skipGrowingFiles : true }))
    .pipe(gulp.dest(`${src}`));
});
 
gulp.task('clean', ['gzip'], () => {
  return gulp.src([`${src}/*.js`, `${src}/*.css`, `${src}/*.html`, `${src}/*.json`, `${src}/*.ico`], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], () => {
});