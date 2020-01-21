import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css'
import minify from 'gulp-babel-minify'
import shell from 'gulp-shell'
import purgecss from 'gulp-purgecss'
import replace from 'gulp-replace'
import fs from 'fs'

const purgeCSS = () => {
  return gulp.src('public/**/*.css')
    .pipe(purgecss({
      content: ['public/**/*.html']
    }))
    .pipe(gulp.dest('./public'));
};

const addInlineCSS = () => {
  const fileContent = fs.readFileSync("public/css/main.css", "utf8");
  return gulp.src('public/**/*.html')
    .pipe(replace('<!-- INLINE_CSS -->', fileContent))
    .pipe(gulp.dest('./public'));
};

const minifyHTML = () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'));
};

const minifyCSS = () => {
  return gulp.src('public/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public'));
};

const minifyJS = () => {
  return gulp.src('public/**/*.js')
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest('./public'));
};

const build = gulp.series(minifyCSS, purgeCSS, addInlineCSS, gulp.parallel(minifyHTML, minifyJS));
exports.build = build;
exports.default = build;
