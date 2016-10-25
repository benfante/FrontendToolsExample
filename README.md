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

##References

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
