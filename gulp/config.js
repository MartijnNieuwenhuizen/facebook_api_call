'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {

    build: './',
    dist: './dist/',
    base: './',
    taskPath: './gulp/tasks/',

    js: {
        watch: ['./js/modules/*.js'],
        src: ['js/script.js'],
        folder: 'js/',
        destFile: 'main.min.js'
    },

    error: function(error) {

        $.notify.onError({
            title: 'Gulp',
            message: 'Error: <%= error.message %>'
        })(error);
        this.emit('end');

    }
};

module.exports = config;
