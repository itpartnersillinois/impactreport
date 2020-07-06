var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');

gulp.task("webfonts", function () {
    return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(gulp.dest("webfonts/"));
});

gulp.task("styles", function () {
    return gulp.src(['_sass/*.scss'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(concat("site.css"))
        .pipe(gulp.dest("style/"));
});

gulp.task("default", gulp.series("styles", "webfonts"));