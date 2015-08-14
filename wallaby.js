module.exports = function () {
  return {
    files: [
      {pattern: 'bower_components/webcomponentsjs/webcomponents-lite.js', instrument: false},

      // Component and its files (files with load: false because they will be loaded by the component)
      'component/simple-element.html',
      {pattern: 'component/*', load: false}
    ],
    tests: ['test/*.js'],

    env: {
      type: 'browser',
      // PhantomJs 2 is required
      runner: 'node_modules/karma-phantomjs2-launcher/node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs',
      // Web components request JavaScript files so we need to clear page cache to avoid using the cached version
      clearMemoryCache: true
    },

    // this will allow wallaby to serve polymer files when requested by components
    middleware: function (app, express) {
      app.use('/polymer',
        express.static(
          require('path').join(__dirname, 'bower_components', 'polymer')));
    },

    // delaying running tests until web components are ready
    bootstrap: function (wallaby) {
      if (!window.CustomElements || !window.CustomElements.readyTime) {
        wallaby.delayStart();
        window.addEventListener('WebComponentsReady', function () {
          wallaby.start();
        });
      }
    }
  };
};
