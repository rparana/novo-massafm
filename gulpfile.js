var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");

// Source Path
var scss_src = "src/scss/style.scss";
var js_src = "./src/scripts/*.js";

// Dist Path
var js_dist = "./";
var js_dist_name = "scripts.js";
var jsFILES = ["src/js/scripts.js"];

gulp.task("sass", function () {
  return gulp
    .src(["src/scss/style.scss"])
    .pipe(sass()) //converte o sass em css
    .pipe(gulp.dest("src/css"));
});

// Minify e Concat Scripts
gulp.task("scripts", function () {
  // return gulp.src(js_src)
  //     .browserify({
  //         entries: [js_src]
  //     })
  //     .transform(babelify, { preset: ['env'] })
  //     .pipe(plumber())
  //     .pipe(uglify())
  //     .pipe(concat(js_dist_name))
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(gulp.dest(js_dist));
  jsFILES.map(function (entry) {
    return browserify({
      entries: [entry],
    })
      .transform(babelify, {
        presets: [["env"]],
      })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(js_dist));
  });
});

gulp.task(
  "watch",
  gulp.series(function () {
    gulp.watch(["src/scss/*.scss"], gulp.parallel(["sass"]));
    //gulp.watch('src/scss/*.scss', gulp.series('sass'));
  })
);

gulp.task("default", gulp.series("sass", "watch"));
