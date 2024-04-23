const { src, dest, watch, parallel, series } = require('gulp');



const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const { notify } = require('browser-sync');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const svgSprite = require('gulp-svg-sprite');

function jadeCompiler() {
  return src('app/*.jade')
    .pipe(jade())
    .pipe(dest('app/'));
};

function html() {
  return src('app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('app/'));
};

function img() {
  return src('app/images/**/*.*')
    .pipe(imagemin())
    .pipe(dest('app/images/'))
};

function doSvgSprite() {
  return gulp.src([
    'app/images/backgrounds/*.svg',
    'app/images/icons/**/*.svg',
    'app/images/logo/*.svg'
  ]) // svg files for sprite
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }
    ))
    .pipe(gulp.dest('app/images/'))
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    ui: {
      port: 8080
    },
    notify: false
  })
}

function styles() {
  return src('app/styles/*.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function generalScripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/swiper/swiper-bundle.js',
    'node_modules/nouislider/dist/nouislider.js',
    'node_modules/imask/dist/imask.js',
    'node_modules/leaflet/dist/leaflet.js',
    'app/js/service/*.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/minified'))
    .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src(['app/js/pages/*.js'])
    .pipe(uglify()) // Минифицировать каждый файл
    .pipe(rename({ suffix: '.min' })) // Добавить суффикс .min
    .pipe(dest('app/js/minified')) // Переместить в папку app/js/minified
    .pipe(browserSync.stream())
}

function build() {
  src([
    'app/**/*.html',
    'app/css/**/*.css',
    'app/js/minified/*.js'
  ], { base: 'app' })
    .pipe(dest('build'));
  src('app/fonts/**/*.*').pipe(dest('build/fonts/'));
  src('app/images/**/*.*').pipe(dest('build/images/'));
  return null
}

function cleanBuild() {
  return del('build')
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/js/main.js', '!app/js/main.min.js'], generalScripts);
  watch(['app/js/pages/*.js'], scripts);
  watch(['app/**/*.jade'], jadeCompiler).on('change', browserSync.reload);
}



exports.styles = styles;
exports.scripts = scripts;
exports.generalScripts = generalScripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.img = img;
exports.html = html;
exports.jadeCompiler = jadeCompiler;
exports.doSvgSprite = doSvgSprite;
exports.build = series(cleanBuild, build);


exports.default = parallel(jadeCompiler, styles, generalScripts, scripts, browsersync, watching);