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
    scripts: path.join(__dirname, 'scripts', '**', '*.js')
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
            handleError: function(err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(concat('dashboard.css'))
        .pipe(gulp.dest(dests.styles))
})

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber({
            handleError: function(err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(babel({
            presets: ['es2015', 'angular']
        }))
        //.pipe(uglify())
        .pipe(concat('dashboard.js'))
        .pipe(gulp.dest(dests.scripts))
})

gulp.task('default', ['clean', 'styles', 'scripts'])
