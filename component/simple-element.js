Polymer({

  is: 'simple-element',

  properties: {

    message: {
      type: Object,
      value: function () {
        return {
          type: 'Greeting',
          text: 'Hello!'
        };
      }
    }

  },

  // Element Lifecycle

  ready: function () {

  },

  attached: function () {

  },

  detached: function () {

  },

  // Element Behavior

  sayHello: function (greeting) {
    var response = greeting || 'Hello World!';
    return 'simple-element says, ' + response;
  }

});
