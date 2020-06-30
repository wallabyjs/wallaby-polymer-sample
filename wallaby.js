module.exports = function () {
  return {
    files: [
      {pattern: 'bower_components/webcomponentsjs/webcomponents-lite.js', instrument: false},

      // Component and its files (files with load: false because they will be loaded by the component)
      'component/simple-element.html',
      {pattern: 'component/*', load: false}
    ],
    tests: ['test/*.js'],

    // this allows wallaby to serve polymer files when requested by components
    middleware: function (app, express) {
      app.use('/polymer',
        express.static(
          require('path').join(__dirname, 'bower_components', 'polymer')));
    },

    // delaying running tests until web components are ready
    setup: function (wallaby) {
      if (!window.CustomElements || !window.CustomElements.readyTime) {
        wallaby.delayStart();
        window.addEventListener('WebComponentsReady', function () {
          wallaby.start();
        });
      }
    },

    debug: true,
    trace: true

    
  };
};
