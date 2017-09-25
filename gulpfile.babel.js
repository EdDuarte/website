import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'

gulp.task('hugo-build', shell.task(['hugo']))

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
})

gulp.task('minify-css', () => {
  return gulp.src('public/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['hugo-build'], (callback) => {
  runSequence('minify-html', 'minify-css', callback);
})
