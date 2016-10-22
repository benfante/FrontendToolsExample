module.exports = function(config) {
    config.set({
        basePath: '../../..',
        frameworks: ['jasmine'],
        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/tether/dist/js/tether.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'src/main/javascript/*.js',
            'src/test/javascript/*.js'
        ],
        exclude: ['src/test/javascript/karma.conf*.js'],
        reporters: ['progress'],
        port: 9876,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatch: true,
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ]
    });
};