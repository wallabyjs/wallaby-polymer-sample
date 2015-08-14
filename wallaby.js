module.exports = function () {
  return {
    files: [
      'bower_components/webcomponentsjs/webcomponents-lite.js',

      // Component and its files (files with load: false because they will be loaded by the component)
      'component/simple-element.html',
      {pattern: 'component/*', load: false}
    ],
    tests: ['test/*.js'],

    debug: true,

    env: {
      type: 'browser',
      // PhantomJs 2 is required
      runner: 'node_modules/karma-phantomjs2-launcher/node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs'
    },

    // this will allow wallaby to serve polymer files when requested by components
    middleware: function (app, express) {
      app.use('/polymer',
        express.static(
          require('path').join(__dirname, 'bower_components', 'polymer')));
    },

    // running tests once web components are ready
    bootstrap: function (wallaby) {
      wallaby.delayStart();

      window.addEventListener('WebComponentsReady', function () {
        wallaby.start();
      });
    }
  };
};
