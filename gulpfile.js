'use strict'

const babel = require('gulp-babel')
const cleanCss = require('gulp-clean-css')
const del = require('del')
const gulp = require('gulp')
const concat = require('gulp-concat')
const less = require('gulp-less')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')

const path = require('path')

const paths = {
    styles: path.join(__dirname, 'styles', '**', '*.less'),
    scripts: path.join(__dirname, 'scripts', '**', '*.js'),
    vendors: [
        path.join(__dirname, 'app', 'node_modules', 'lodash', 'lodash.js'),
        path.join(__dirname, 'node_modules', 'angular', 'angular.js'),
        path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'),
        path.join(__dirname, 'node_modules', 'angular-websocket', 'angular-websocket.js'),
    ]
}

const dests = {
    styles: path.join(__dirname, 'app', 'styles'),
    scripts: path.join(__dirname, 'app', 'scripts'),
}

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts'])
    gulp.watch(paths.styles, ['styles'])
})

gulp.task('clean', function() {
    del([
        path.join(dests.styles, '*'),
        path.join(dests.scripts, '*')
    ])
})

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(concat('irdash.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dests.styles))
})

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(babel({
            presets: ['es2015', 'angular']
        }))
        .pipe(uglify())
        .pipe(concat('irdash.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dests.scripts))
})

gulp.task('vendors', function() {
    return gulp.src(paths.vendors)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(uglify())
        .pipe(concat('vendors.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(dests.scripts))
})

gulp.task('default', ['clean', 'vendors', 'styles', 'scripts'])
