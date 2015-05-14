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
  documentation = require('documentation');
    
var testFiles = [
    'dist/js/main.js'
];

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

var sources ={
    tests: "src/tests/*.js",
    sass : "src/sass/*.scss",
    html : "src/html/*.html",
    coffee : "src/coffee/*.coffee"
};
var destinations ={
    sass : "dist/css/",
    html : "dist/html/",
    coffee : "dist/coffee/",
    doc : "dist/doc/"
};

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
        open: false,
        server: {
            baseDir: "./dist"
        }
    });
});
gulp.task("html", function () {
    console.log("html was changed");
    gulp.src("./src/html/*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(reload({stream: true}));
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
        .pipe(reload({stream: true}));
    console.log("coffee was served");
});
gulp.task('watch', function() {
    gulp.watch(sources.tests, ['test']);
    gulp.watch(sources.sass, ['sass2css']);
    gulp.watch(sources.html, ['html']);
    gulp.watch(sources.coffee, ['coffee2js']);

});
var jsdoc = require("gulp-jsdoc");
gulp.task('doc', function () {
    gulp.src('./dist/js/essai.js')
        .pipe(jsdoc(destinations.doc+'doc/main-documentation'))

});
gulp.task("default", ["coffee2js", "sass2css", "html", "browser-sync", "watch", "tdd", "doc"], function () {
    console.log("spartiiiii");
});