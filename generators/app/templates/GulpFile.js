/**
 * Created by tykayn on 14/05/15.
 */
var gulp = require("gulp"),
  gutil = require("gulp-util"),
  plumber = require("gulp-plumber"),
  myth = require("gulp-myth"),
  csso = require("gulp-csso"),
  coffee = require("gulp-coffee"),
  options = require("minimist")(process.argv.slice(2)),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  karma = require('karma').server,
  documentation = require('documentation'),
  jsdoc = require("gulp-jsdoc");
var wiredep = require('wiredep').stream;
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var testFiles = [
  'dist/js/main.js'
];

var sources = {
  tests: "src/tests/*.js",
  sass: "src/sass/*.scss",
  html: "src/html/*.html",
  htmls: "src/html/**/*.html",
  js: "src/scripts/*.js",
  jsAll: "src/scripts/**/*.js",
  coffee: "src/coffee/*.coffee"
};
var destinations = {
  sass: "dist/css/",
  html: "dist/",
  coffee: "dist/coffee/",
  js: "dist/js/",
  doc: "dist/doc/"
};

gulp.task('bower', function () {
  gulp.src(sources.html)
    .pipe(wiredep({
      exclude: "www/lib/angular/angular.js"
    }))
    .pipe(gulp.dest(destinations.html));
});
gulp.task('vendor-scripts', function() {
  return gulp.src(wiredep().js)
    .pipe(gulp.dest(destinations.js));
});

gulp.task('vendor-css', function() {
  return gulp.src(wiredep().css)
    .pipe(gulp.dest(destinations.css));
});

var imageminJpegoptim = require('imagemin-jpegoptim');

gulp.task('imagemin', function () {
  return gulp.src('images/*.jpg')
    .pipe(imageminJpegoptim({progressive: true})())
    .pipe(gulp.dest('dist/images'));
});

gulp.task("html", function () {
  console.log("html was changed");
  gulp.src([sources.html, sources.htmls])
    .pipe(gulp.dest(destinations.html))
    .pipe(reload({stream: true}));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});
gulp.task('cover', function (done) {
  gulp.src([sources.jsAll, sources.js])
    .pipe(istanbul()) // Covering files
    .pipe(gulp.dest('test-tmp/'))
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .pipe(istanbul.enforceThresholds({thresholds: {global: 20}})) // Enforce a coverage of at least 90%
        .on('end', done);
    });
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task("styles", function () {
  gulp.src("./src/css/*.css")
    .pipe(options.production ? plumber() : gutil.noop())
    .pipe(myth({sourcemap: !options.production}))
    .pipe(options.production ? csso() : gutil.noop())
    .pipe(gulp.dest("./dist/css/"));
});
gulp.task("hello", function () {
  console.log("hello le monde!");
});
gulp.task('browser-sync', function () {
  return browserSync.init(null, {
    open: true,
    server: {
      baseDir: "./dist"
    }
  });
});
gulp.task("sass2css", function () {
  console.log("style was changed");
  gulp.src("./src/sass/*.scss")
    .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(reload({stream: true}))
    .on('error', gutil.log);
});
gulp.task("coffee2js", function () {
  console.log("coffee was changed");
  gulp.src("./src/coffee/**/*.coffee")
    .pipe(coffee())
    .pipe(plumber())
    .pipe(gulp.dest("./dist/js/"))
    .pipe(uglify())
    .pipe(reload({stream: true}));
  console.log("coffee was served");
});
gulp.task('watch', function () {
  gulp.watch(sources.tests, ['test']);
  gulp.watch(sources.sass, ['sass2css']);
  gulp.watch(sources.htmls, ['bower','html']);
  gulp.watch(sources.coffee, ['coffee2js', 'doc', 'test']);
  gulp.watch(sources.js, ['doc']);

});

gulp.task('lint', function () {
  gulp.src(sources.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('doc', function () {
  gulp.src(sources.js)
    .pipe(jsdoc(destinations.doc + 'doc/main-documentation'))
    .pipe(reload({stream: true}));
});
gulp.task("default", ["coffee2js", "sass2css", "lint", "bower", "browser-sync", "imagemin", "watch", "tdd", "doc"], function () {
  console.log("spartiiiii");
});