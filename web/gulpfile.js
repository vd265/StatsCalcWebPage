const htmlPartial = require('gulp-html-partial');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concatCss = require('gulp-concat-css');
const include = require('gulp-include')
var uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

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

function jquery(){
    return gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
      ])
      .pipe(gulp.dest('build/vendor/jquery'))
}

function del() {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
}


function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html));
    gulp.watch('src/**/*.css', gulp.series(css));
    gulp.watch('src/**/*.js', gulp.series(js));
    return;
}



exports.default = gulp.series(del,html, css, js,jquery);


