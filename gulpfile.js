var gulp = require('gulp');
var EmailBuilder = require('gulp-email-builder');
var sass = require('gulp-sass');

var options = {
    encodeSpecialChars: true,
    emailTest: {

        // Email to send to
        to: 'dbiddle@zonedigital.com',

        // Email sent from
        from: 'gulpemailtest@davidbiddle.co.uk',

        // Your email Subject
        subject: 'Gulp Email Test'
    }
}
var builder = EmailBuilder(options);

gulp.task('sass', function(){
  return gulp.src('./src/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./src/'))
});

gulp.task('emailBuilder', function() {
    return gulp.src(['./src/*.html'])
        .pipe(builder.inlineCss())
        .pipe(builder.sendEmailTest())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('inline', function() {
    return gulp.src(['./src/*.html'])
        .pipe(builder.inlineCss())
        .pipe(gulp.dest('./dist/'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./src/*.scss', ['sass','inline']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'emailBuilder']);