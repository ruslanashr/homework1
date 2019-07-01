const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const image = require('gulp-image');
const uglify = require('gulp-uglify');


function style(){
    return gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
function template(){
    return gulp.src('./index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function img(){
    return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

function js(){
    return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

}

async function build(){
    await style();
    await template();
    await img();
    await js();
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
    gulp.watch('./sass/*.sass', style);
    gulp.watch('./index.pug', template);
    gulp.watch('./img/*', img);
    gulp.watch('./js/*', js);
}

exports.style = style;
exports.template = template;
exports.build = build;
exports.watch = watch;
exports.js = js;

