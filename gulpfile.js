// Inspiration: https://gist.github.com/mlouro/8886076

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
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


/* 
 * TODO: use realfavicongenerator
 * https://github.com/RealFaviconGenerator/gulp-real-favicon
 */


/* 
 * We can't use gulp-plumber for browserify (blacklisted)
 * This catches browserify errors so the program doesn't crash.
 * 
 * process.on('uncaughtException', console.error.bind(console));
 *
 * However, it DOESN'T fix the live reload.
 */

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(plumber())
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
        'src/es6/*.es6'
      ])
       .pipe(plumber())
       .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .on('error', function() {
        console.error('error in lintjs');
      });
});

gulp.task('js', function(){
    gulp.src(
        ['src/js/*.js',
        'src/js/*.es6'])
        return browserify({entries: 'src/js/app.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        //.on('error', console.error.bind(console)) // doesn't work
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
    .pipe(plumber())
    .pipe(gulp.dest('app/js/lib/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('html', function(){
  gulp.src('src/html/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('cfg', function() {
  gulp.src(
  	[
  	'src/html/browserconfig.xml',
  	'src/html/manifest.json',
  	'src/html/robots.txt',
  	'src/html/humans.txt'
  	])
    .pipe(plumber())
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('images', function() {
    gulp.src('src/images/**/*.{png, jpg, svg, gif, svg, ico}')
    .pipe(plumber())
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
    gulp.src('src/audio/**/*.mp3')
    .pipe(plumber())
    .pipe(gulp.dest('app/audio/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('video', function() {
    gulp.src('src/video/**/*.mp4')
    .pipe(plumber())
    .pipe(gulp.dest('app/video/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('fonts', function (){
    gulp.src('src/fonts/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('app/fonts/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('models',function(){
    gulp.src('src/models/obj/*.obj')
    .pipe(plumber())
    .pipe(gulp.dest('app/models/'))
    .pipe(browserSync.reloac({stream:true, once: true}));
});

gulp.task('browser-sync', function () {
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
    gulp.watch("src/fonts/*.*", ['fonts']);
    gulp.watch("src/models/**/*.obj", ['models']);
    gulp.watch("src/html/*.html", ['html']);
    gulp.watch(["src/html/*.xml", "src/html/*.txt", "src/html/*.json"], ['cfg']);
    gulp.watch("app/*.html", ['bs-reload']);
});
