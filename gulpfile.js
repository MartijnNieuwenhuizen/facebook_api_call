'use strict';

var gulp = require('gulp');
var config = require('./gulp/config');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var reload = browserSync.reload;
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {

   	return gulp.src(config.js.src)
   		.pipe(plumber({
             errorHandler: config.error
        }))
    	.pipe(browserify({
      	insertGlobals : false
    	}))
        .pipe(uglify())
        .pipe(rename(config.js.destFile))
        .pipe(gulp.dest(config.base + config.js.folder));

});

gulp.task('browser-sync', function() {

    browserSync.init({
		server: {
            baseDir: "./"
        }
    });

});

// Watch task
gulp.task('watch', function() {

	gulp.watch(config.js.watch, ['browserify']);

});

// Server task
gulp.task('server', function() {

	return runSequence(
		'browserify',
		'browser-sync',
		'watch'
	);

});
