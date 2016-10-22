var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;
var mainBowerFiles = require('gulp-main-bower-files');

gulp.task("copy_bower_dependencies", function copyBowerDependencies() {
    gulp.src("./bower_components/**/*")
            .pipe(gulp.dest("src/main/webapp/assets/bower_components/"));
});

var bowerOverrides = {
    'bootstrap': {
        main: ['dist/js/bootstrap.js', 'dist/css/bootstrap.css'],
        dependencies: {
            "jquery": "1.9.1 - 3",
            "tether": ">=1.3.3"
        }
    },
    'tether': {main: ['dist/js/tether.js', 'dist/css/tether.css']}
};

gulp.task('copy_main_dependencies', function copyMainDependencies() {
    return gulp.src('./bower.json')
            .pipe(mainBowerFiles(['**/*.js', '**/*.css'], {overrides: bowerOverrides}))
            .pipe(gulp.dest('./src/main/webapp/assets/bower_components/'));
});

gulp.task('css', function () {
    gulp.src('src/main/styles/**/*.css')
            .pipe(cleanCSS())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(concat('frontend-tools-example.min.css'))
            .pipe(gulp.dest('src/main/webapp/assets/application/css'));
});

gulp.task('js', function () {
    gulp.src('src/main/javascript/**/*.js')
            .pipe(concat('frontend-tools-example.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('src/main/webapp/assets/application/js/'));
});

gulp.task('deps', function () {
    return gulp.src(['src/main/pages/javascripts.jspf', 'src/main/pages/stylesheets.jspf'])
            .pipe(wiredep({
                fileTypes: {
                    html: {
                        replace: {
                            js: '<script src="${cp}/assets/bower_components/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="${cp}/assets/bower_components/{{filePath}}" />'
                        }
                    }
                },
                overrides: bowerOverrides,
                ignorePath: '../../../bower_components/'
            }))
            .pipe(gulp.dest('src/main/webapp/WEB-INF/jsp/'));
});

gulp.task('default', ['css', 'js', 'copy_bower_dependencies', 'deps']);
