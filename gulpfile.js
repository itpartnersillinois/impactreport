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

<<<<<<< HEAD
=======
gulp.task("default", gulp.series("styles", "webfonts"));

>>>>>>> 6421660 (Update)
gulp.task("copy2021", function () {
    return gulp.src('./archive2021/**')
        .pipe(gulp.dest('./_site/archive2021'));
});
<<<<<<< HEAD

gulp.task("default", gulp.series("styles", "webfonts"));
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 86d1433 (Update)
=======
>>>>>>> 7dcf2e4 (Update gulpfile.js)
>>>>>>> b62d195 (Update gulpfile.js)
=======
>>>>>>> 6421660 (Update)
