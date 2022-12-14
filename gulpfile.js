const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp');
const scss           = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const svgSprite      = require('gulp-svg-sprite');
const imagemin       = require('gulp-imagemin');
const rename         = require('gulp-rename');
const fileInclude    = require('gulp-file-include');
const del            = require('del');
const browserSync    = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

const htmlInclude = () => {
  return src(['app/html/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/*.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/wowjs/dist/wow.js',
      'node_modules/@fancyapps/ui/dist/carousel.umd.js',
      'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
      'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
      'app/js/components/*.js',   
      'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function svgSprites() {
  return src('app/images/icons/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

function build() {
  return src([
      'app/*.html',
      'app/css/style.min.css',
      'app/js/main.min.js'
    ], {
      base: 'app'
    })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/images/icons/**/*.svg'], svgSprites);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.svgSprites = svgSprites;
exports.images = images;
exports.htmlInclude = htmlInclude;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.default = parallel(htmlInclude, svgSprites, styles, scripts, browsersync, watching);