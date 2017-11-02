const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const SassModuleImporter = require('sass-module-importer');
const mqpacker = require('gulp-combine-mq');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-csso');

gulp.task('styles', ()=> {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({importer: SassModuleImporter()}))
    .on('error', notify.onError(function(error){
        return {
            title: 'Styles',
            message: error.message
        }
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(mqpacker({
        beautify: true
    }))
    .pipe(gulp.dest('./src/dist'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./src/dist/'))
})