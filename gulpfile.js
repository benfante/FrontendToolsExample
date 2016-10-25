/*
 * Copyright 2016 Lucio Benfante <lucio.benfante@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;

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

gulp.task("copy_bower_dependencies", function copyBowerDependencies() {
    gulp.src("./bower_components/**/*")
            .pipe(gulp.dest("target/generated-sources/main/webapp/assets/bower_components/"));
});

gulp.task('css', function () {
    gulp.src('src/main/styles/**/*.css')
            .pipe(cleanCSS())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(concat('frontend-tools-example.min.css'))
            .pipe(gulp.dest('target/generated-sources/main/webapp/assets/application/css'));
});

gulp.task('js', function () {
    gulp.src('src/main/javascript/**/*.js')
            .pipe(concat('frontend-tools-example.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('target/generated-sources/main/webapp/assets/application/js/'));
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
            .pipe(gulp.dest('target/generated-sources/main/webapp/WEB-INF/jsp/'));
});

gulp.task('default', ['css', 'js', 'copy_bower_dependencies', 'deps']);
