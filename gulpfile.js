const gulp = require('gulp');
const gzip = require('gulp-gzip');
const minify = require('gulp-minify-css');
const purify = require('gulp-purifycss');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-string-replace');
const dom = require('gulp-jsdom');

const apiEnv = {
  local: 'https://api-oscommercenl.deb1.bvb.vg',
  dev: 'https://api-plattetvnl.deb1.bvb.vg',
  prod: 'https://api-plattetvnl.ct1node1.retailenclicks.nl'
}

const tagManagerId = {
  local: 'GTM-W52QXGC',
  dev: 'GTM-PH82WNL',
  prod: 'GTM-PH82WNL'
}

const [command, value] = (process.argv[2]) ? process.argv[2].split('=') : '';
const [command1, env] = (process.argv[3]) ? process.argv[3].split('=') : '';
const src = (value) ? `./dist/${value}` : `./dist`;

gulp.task('pack-js', () => {
  return gulp.src([`${src}/*.js`])
    .pipe(uglify())
    .pipe(gulp.dest(`${src}`));
});

gulp.task('pack-css', () => {
  return gulp.src([`${src}/*.css`])
    .pipe(purify([`${src}/index.html`, `${src}/app-pages-*.js`, `${src}/main.*.js`]))
    .pipe(minify())
    .pipe(gulp.dest(`${src}`));
});

gulp.task('pack-index-html', () => {
  return gulp.src([`${src}/index.html`])
    .pipe(dom((document) => {
      document.querySelectorAll('html')[0].setAttribute('lang', value);
      document.getElementById('apiPreconnect').setAttribute('href', apiEnv[env]);

      const ns = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${tagManagerId[env]}`;
      iframe.width = 0;
      iframe.height = 0;
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      ns.appendChild(iframe);
      document.body.appendChild(ns);
    }))
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
