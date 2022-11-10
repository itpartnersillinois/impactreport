var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require('gulp-cssmin');
var sass = require('gulp-dart-sass');

gulp.task("webfonts", function () {
    return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(gulp.dest("webfonts/"));
});

gulp.task("styles", function () {
    return gulp.src(['_sass/main.scss'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(concat("site.css"))
        .pipe(gulp.dest("style/"));
});

gulp.task("copy2020", function () {
    return gulp.src('./archive2020/**')
        .pipe(gulp.dest('./_site/archive2020'));
});

gulp.task("copy2021", function () {
    return gulp.src('./archive2021/**')
        .pipe(gulp.dest('./_site/archive2021'));
});

gulp.task("default", gulp.series("styles", "webfonts"));
