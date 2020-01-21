import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css'
import minify from 'gulp-babel-minify'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'
import purgecss from 'gulp-purgecss'
import replace from 'gulp-replace'
import fs from 'fs'

gulp.task('hugo-build', shell.task(['hugo']))

gulp.task('purgecss', () => {
  return gulp.src('public/**/*.css')
    .pipe(purgecss({
      content: ['public/**/*.html']
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('add-inline-css', () => {
  const fileContent = fs.readFileSync("public/css/main.css", "utf8");
  return gulp.src('public/**/*.html')
    .pipe(replace('<!-- INLINE_CSS -->', fileContent))
    .pipe(gulp.dest('./public'));
});

gulp.task('minify-html', () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('minify-css', () => {
  return gulp.src('public/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('minify-js', () => {
  return gulp.src('public/**/*.js')
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['hugo-build'], (callback) => {
  runSequence('minify-css', 'purgecss', 'add-inline-css', 'minify-html', 'minify-js', callback);
});
