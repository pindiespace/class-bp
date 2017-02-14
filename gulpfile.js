// Inspiration: https://gist.github.com/mlouro/8886076

var gulp = require('gulp'),
    sass = require('gulp-sass'),                  // SASS to CSS
    browserify = require('browserify'),           // ES6 transpile
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),        // live reload
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),              // Minify
    jshint = require('gulp-jshint'),              // jshint report
    stylish = require('jshint-stylish'),
    imagemin = require('gulp-imagemin'),          // optimize images
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jslint', function(){
    return gulp.src([
        'src/js/*.js',
        'src/js/*.es6'
      ]).pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .on('error', function() {
        console.error('error in lintjs');
      });
});

gulp.task('js',function(){
    gulp.src('src/js/*.js')
        return browserify({entries: 'src/js/app.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('jslib', function(){
  gulp.src('src/js/lib/**/*.*')
    .pipe(gulp.dest('app/js/lib/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('html', function(){
  gulp.src('src/html/index.html')
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('images', function() {
    gulp.src('src/images/**/*.{png, jpg, svg, gif}')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        // png optimization
        optimizationLevel: 3
      }))
    .pipe(gulp.dest('app/img/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('audio', function() {
    gulp.src('src/images/**/*.mp3')
    .pipe(gulp.dest('app/audio/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('video', function() {
    gulp.src('src/images/**/*.mp4')
    .pipe(gulp.dest('app/video/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['jslint', 'js']);
    gulp.watch("src/js/lib/**/*.js", ['jslib']);
    gulp.watch("src/images/**/*.png", ['images']);
    gulp.watch("src/audio/**/*.mp3", ['audio']);
    gulp.watch("src/video/**/*.mp4", ['video']);
    gulp.watch("src/html/*.html", ['html']);
    gulp.watch("app/*.html", ['bs-reload']);
});
