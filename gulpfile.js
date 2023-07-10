const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');

function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function images() {
  return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality : 50 }))

    .pipe(newer('app/images'))
    .pipe(src('app/images/src/*.*'))
    .pipe(webp())
    
    .pipe(newer('app/images'))
    .pipe(src('app/images/src/*.*'))    
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function sprite () {
  return src('app/images/*svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg',
        example: true
      }
    }

  }))
  .pipe(dest('app/images'))
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'app/js/*.js',
    '!app/js/main.min.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {  
  watch(['app/scss/style.scss'], styles)
  watch(['app/images/src'], images)
  watch(['app/js/*.js', '!app/js/main.min.js'], scripts)
  watch(['*.html']).on('change', browserSync.reload);
  watch('*.php').on('change', browserSync.reload);
}

function browsersync() {
  browserSync.init({
    proxy: 'http://wp-it-volunteers/',
    host: 'wp-it-volunteers',
    open: 'external'
  });
}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*.svg',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/*.html',
  ], {base : 'app'}  )
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = (series(cleanDist, building));
exports.default = parallel(styles, images, scripts, browsersync, watching);
