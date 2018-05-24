"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var run = require("run-sequence");
var del = require("del");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var server = require("browser-sync").create();

gulp.task("copy", function()  {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
  gulp.src("source/css/slick.css")
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("slick.min.css"))
    .pipe(gulp.dest("build/css"));
  gulp.src("source/css/slick-theme.css")
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("slick-theme.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function()  {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function()  {
  return gulp.src("source/img/**/*.{png, jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("js", function()  {
  return gulp.src("source/js/common.js")
    .pipe(uglify())
    .pipe(rename("common.min.js"))
    .pipe(gulp.dest("build/js")),
  gulp.src("source/js/slick.js")
    .pipe(uglify())
    .pipe(rename("slick.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});

gulp.task("build", function(done)  {
  run("clean", "copy", "style", "html", "js", done);
});
