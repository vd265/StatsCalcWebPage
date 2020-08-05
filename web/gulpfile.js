const htmlPartial = require('gulp-html-partial');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concatCss = require('gulp-concat-css');
const include = require('gulp-include')
var uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const htmlFile = [
    'src/*.html',
]

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        })).pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
}

function css() {
    return gulp.src(['src/css/*.css', 'src/node_modules/chart.js/dist/*.css'])
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('build/'));

}

function js(){
    return gulp.src(['src/js/*.js'])
            .pipe(concat('index.js'))
            .pipe(gulp.dest('build/'));
}

exports.default = gulp.series(html, css, js);


