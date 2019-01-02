var gulp = require("gulp");
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");

//编译scss 压缩css
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/css"))
})

//合并js 压缩js
gulp.task("devJs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./src/js"))
})

//watch监听js,css
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"));
    return gulp.watch("./src/js/*.js", gulp.series("devJs"));
})

//起服务
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            livereload: true
        }))
})

//default任务
gulp.task("default", gulp.series("devSass", "devJs", "server", "watch"))


//build任务

gulp.task("bSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/dist/css"))
})

//合并js 压缩js
gulp.task("bJs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./src/dist/js"))
})

gulp.task("build", gulp.series('bSass', 'bJs'))