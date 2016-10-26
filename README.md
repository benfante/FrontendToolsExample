# FrontendToolsExample

[![Build Status](https://travis-ci.org/benfante/FrontendToolsExample.svg?branch=master)](https://travis-ci.org/benfante/FrontendToolsExample)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/benfante/FrontendToolsExample/master/LICENSE)

A sample project using frontend tools (Nodejs, Bower, Gulp, Grunt, etc.) in a Java webapp.

## Building

This project builds with [Maven](http://apache.maven.org). You do not need to install Maven to build the project, as Maven can install itself through the [Maven wrapper plugin](https://github.com/rimerosolutions/maven-wrapper). To build, run this in the checkout main directory:

```
./mvnw clean install
```

That will build the entire project, download and install all the needed front-end tools (NodeJS, Bower, Gulp, etc.) and package the webapp.

Then you'll can run it with:

```
./mvnw jetty:run
```

Point your browser to `http://localhost:8080/FrontendToolsExample` for seeing the result.

If you need to totally clean the project (for removing all the externally downloaded parts and generated sources...so clean as just after the checkout), type:

```
./mvnw clean -Pclean-all
```

## Project building process features

### Front-end tools installation

The [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) will download and install NodeJS, NPM, Bower, Gulp and Karma.

Look at the `pom.xml` for the plugin configuration:

```
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

```
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

Open a termina session, and go to the main directory of the project for launching the scripts.

Following some examples:

#### Add a new NodeJS module

For example, if you need Webpack:

```
./helper-scripts/npm install webpack --save-dev
```

(then look at the updated `package.json` and in the `node_modules/webpack` directory)

#### Add a new front-end component

For example, if you need [Select2](https://select2.github.io/):

```
./helper-scripts/bower install select2 --save
```

(then look at the updated `bower.json` and in the `bower_components/select2` directory)

#### Re-build your Javascript

```
./helper-scripts/gulp js
```

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
