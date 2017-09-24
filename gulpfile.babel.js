import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import runSequence from 'run-sequence'
import shell from 'gulp-shell'

gulp.task('hugo-build', shell.task(['hugo']))

gulp.task('minify', () => {
  return gulp.src(['public/**/*.html','public/**/*.css','public/**/*.js'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('build', ['hugo-build'], (callback) => {
  runSequence('minify', callback)
})
