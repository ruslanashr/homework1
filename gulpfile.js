const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');


function style(){
    return gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
function template(){
    return gulp.src('./*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function img(){
    gulp.src('/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

async function build(){
    await style();
    await template();
    await img();
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
    gulp.watch('./sass/*.sass', style);
    gulp.watch('./*.pug', template);
    gulp.watch('./img/*', img);
}

exports.style = style;
exports.template = template;
exports.build = build;
exports.watch = watch;

