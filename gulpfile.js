"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets"], function () {
    console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("app", ['index'], function(){
    return gulp.src(["src/app/**", "!src/app/**/*.ts"])
        .pipe(gulp.dest("build/app"));
});
/* get the index file to the root of the build */
gulp.task("index", ["systemjs", "environments"], function(){
    return gulp.src(["src/index.html", "src/main.js"])
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["src/styles.css"])
        .pipe(gulp.dest("build"));
});
/**
 * Copy systemjs
 */
gulp.task("systemjs", function(){
    return gulp.src(["src/systemjs.config.js", "src/systemjs-angular-loader.js"])
        .pipe(gulp.dest("build"));
});
/* Copying environments */
gulp.task("environments", function(){
    return gulp.src(["src/environments/*.js"])
        .pipe(gulp.dest("build/environments"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        'es6-shim/es6-shim.min.js',
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'rxjs/bundles/Rx.js',
        'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
        '@angular/animations/bundles/animations.umd.js',
        '@angular/common/bundles/common.umd.js',
        '@angular/compiler/bundles/compiler.umd.js',
        '@angular/core/bundles/core.umd.js',
        '@angular/forms/bundles/forms.umd.js',
        '@angular/http/bundles/http.umd.js',
        '@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router/bundles/router.umd.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Run npm start
 */
gulp.task('npm-start', function (callback) {
    exec('npm start', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callback(err);
    });
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});