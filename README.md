# FrontendToolsExample

[![Build Status](https://travis-ci.org/benfante/FrontendToolsExample.svg?branch=master)](https://travis-ci.org/benfante/FrontendToolsExample)
[![Build status](https://ci.appveyor.com/api/projects/status/h6ix2nv6esfckt0s?svg=true)](https://ci.appveyor.com/project/benfante/frontendtoolsexample)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/benfante/FrontendToolsExample/master/LICENSE)

A sample project using frontend tools (Nodejs, Bower, Gulp, Grunt, etc.) in a Java webapp.

## Building

This project builds with [Maven 3](http://apache.maven.org). You do not need to install Maven to build the project, as Maven can install itself through the [Maven wrapper plugin](https://github.com/rimerosolutions/maven-wrapper). To build, run this in the checkout main directory:

```sh
./mvnw clean install
```

That will build the entire project, download and install all the needed front-end tools (NodeJS, Bower, Gulp, etc.) and package the webapp.

Then you'll can run it with:

```sh
./mvnw jetty:run
```

Point your browser to `http://localhost:8080/FrontendToolsExample` for seeing the result.

If you need to totally clean the project (for removing all the externally downloaded parts and generated sources...so clean as just after the checkout), type:

```sh
./mvnw clean -Pclean-all
```

## Project building process features

### Front-end tools installation

The [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) will download and install NodeJS, NPM, Bower, Gulp and Karma.

Look at the `pom.xml` for the plugin configuration:

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.1</version>
    <executions>

        <execution>
            <id>install node and npm</id>
            <phase>initialize</phase>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
                <nodeVersion>v4.6.0</nodeVersion>
                <npmVersion>2.15.9</npmVersion>
            </configuration>
        </execution>

        <!-- Other executions here for configuring the execution of different tools.
            Look at the pom.xml in the project.
         -->

    </executions>
</plugin>
```

NodeJS will be installed in the `node` directory. The NodeJS modules (Bower, Grunt, Gulp, etc.)
will be installed in the `node_modules` directory through NPM. Look at the `package.json` file
for the NPM configuration:

```json
{
  "name": "frontend-tools-example",
  "version": "1.0.0",
  "description": "Front-end development in Java webapps example.",
  "main": "index.htm",
  "dependencies": {},
  "devDependencies": {
    "bower": "^1.7.9",
    "grunt": "^1.0.1",
    "grunt-cli": "^1.2.0",
    "grunt-contrib-jshint": "^1.0.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean-css": "^2.0.11",
    "gulp-concat": "^2.6.0",
    "gulp-main-bower-files": "^1.5.3",
    "gulp-uglify": "^1.5.4",
    "jasmine-core": "^2.4.1",
    "karma": "^1.1.1",
    "karma-jasmine": "^1.0.2",
    "karma-phantomjs-launcher": "^1.0.1",
    "phantomjs-prebuilt": "^2.1.7",
    "wiredep": "^4.0.0"
  },
  "scripts": {
    "prebuild": "npm install",
    "build": "gulp"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/benfante/FrontendToolsExample"
  },
  "author": "Lucio Benfante",
  "license": "Apache-2.0"
}
```

### Helper script for tool execution

Usually you'll execute the tools through the Maven build process, but sometimes
it's useful to execute directly a single tool, without rebuilding all the project.
For example, for adding a front-end dependency, for rebuilding the minified CSS and Javascript, 
for executing only the Javascript tests, etc.

There is no need to install NodeJS, NPM, Gulp, etc. in your computer, as they are
already installed automatically into the project. For using this local installation,
the project provides some helper scripts in the `helper-scripts` directory.

Open a terminal session, and go to the main directory of the project for launching the scripts.

Following some examples:

#### Add a new NodeJS module

For example, if you need Webpack:

```shell
./helper-scripts/npm install webpack --save-dev
```

(then look at the updated `package.json` and in the `node_modules/webpack` directory)

#### Add a new front-end component

For example, if you need [Select2](https://select2.github.io/):

```sh
./helper-scripts/bower install select2 --save
```

(then look at the updated `bower.json` and in the `bower_components/select2` directory)

#### Re-build your Javascript

```sh
./helper-scripts/gulp js
```

### Front-end component management

The project uses Bootstrap and JQuery. The front-end project components are managed through Bower.

Look at the bower configuration file `bower.json`:

```json
{
  "name": "frontend-tools-example",
  "version": "1.0.0",
  "dependencies": {
    "jquery": "^2.2.1",
    "bootstrap": "v4.0.0-alpha.5",
    "tether": "^1.3.3"
  },
  "private": true
}
```

All the dependencies are downloaded in the `bower_components` directory.

If you need other components, add them to the `bower.json` (or, better, using 
the bower command, as previously seen).

### Packaging CSS and Javascript

The CSS and the Javascript is manipulated and moved in the webapp structure by Gulp.

The final location will be the `assets` path, so they will be requested at the `http:/your-server/your-context-path/assets/and-so-on...` URLs.

In fact Gulp moves the components in the `target/generated-sources/main/webapp` directory. Look at the `gulpfile.js`.

The `copy_bower_dependencies` task copies the bower components from the `bower_components`
directory, to the `target/generated-sources/main/webapp/assets/bower_components` directory:

```javascript
gulp.task("copy_bower_dependencies", function copyBowerDependencies() {
    gulp.src("./bower_components/**/*")
            .pipe(gulp.dest("target/generated-sources/main/webapp/assets/bower_components/"));
});
```

The `css` task gets all the css files from the `src/main/styles` directory (and subdirectories),
cleans the css, autoprefix and concatenate them to the
`target/generated-sources/main/webapp/assets/application/css/frontend-tools-example.min.css` file:

```javascript
gulp.task('css', function () {
    gulp.src('src/main/styles/**/*.css')
            .pipe(cleanCSS())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(concat('frontend-tools-example.min.css'))
            .pipe(gulp.dest('target/generated-sources/main/webapp/assets/application/css'));
});
```

The `js` task gets all the Javascripts files from the `src/main/javascript` directory (and subdirectories),
cleans and concatenates them to the
`target/generated-sources/main/webapp/assets/application/js/frontend-tools-example.min.js` file:

```javascript
gulp.task('js', function () {
    gulp.src('src/main/javascript/**/*.js')
            .pipe(concat('frontend-tools-example.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('target/generated-sources/main/webapp/assets/application/js/'));
});
```

Putting these files in the `target` subtree (instead that, for example, in the `src` subtree)
is a strong indication that such files should not be added to your version control system.

Then Maven will package also these files in the resulting war, thanks to the following web resource
definition in the `pom.xml`:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>3.0.0</version>
    <configuration>
        <failOnMissingWebXml>false</failOnMissingWebXml>
        <webResources>
            <resource>
                <directory>target/generated-sources/main/webapp</directory>
            </resource>
        </webResources>
    </configuration>
</plugin>
```

### Wiring CSS and Javascript in the pages

Automatically downloading the frontend componens by bower is surely usefull, but You still
have to put in the HTML pages the references to CSS and Javascripts. Combining Bower and Gulp
You can automate even this task. Look at the `deps` task in the `gulpfile.js`:

```javascript
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
```

It uses the [wiredep](https://github.com/taptapship/wiredep) NodeJS module for extracting from the Bower
dependencies the references to the main files of each component, and put them in the correct place.

For example, looking at the `src/main/pages/javascripts.jspf` file:

```html
<!-- bower:js -->
<!-- Don't put nothing here: it will be replaced by gulp. -->
<!-- endbower -->
```

The content between the comments will be
replaced by the corresponding list of "replace" strings, filled with the js files declared as
"main" by the bower components. The same for the css in the `stylesheets.jspf`.

The result for `javascripts.jspf` will be:

```jsp
<!-- bower:js -->
<script src="${cp}/assets/bower_components/jquery/dist/jquery.js"></script>
<script src="${cp}/assets/bower_components/tether/dist/js/tether.js"></script>
<script src="${cp}/assets/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<!-- endbower -->
```

Some configuration is needed if the bower component doesn't declare correctly its main
files, or if the dependencies of some components must be declared for assuring the
correct order of the generated list. In these cases you can override specific parts
of the configuration of the bower components. In our case:

```javascript
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
```

Here we changed the main files of the bootstrap and tether modules, and added
tether as dependency of bootstrap.

The resulting `javascripts.jspf` and `stylesheets.jspf` files are stored in the 
`target/generated-sources/main/webapp/WEB-INF/jsp/` directory, and then packaged
into the war by Maven.

## References

* The sample page (html, css and js) is taken from the [Offcanvas example](http://v4-alpha.getbootstrap.com/examples/offcanvas/) of [Bootstrap 4 - alpha 4](http://v4-alpha.getbootstrap.com).
* Most of the frontend tooling work in the project build is done by the [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin).
* Look at [the presentation](http://www.slideshare.net/benfante/frontend-tools-in-java-webapps) I did for the [JUG Padova](http://www.jugpadova.it) during the [DigitalMeet 2016](http://digitalmeet.it/).

## License

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
