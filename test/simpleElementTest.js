describe('simple element', function () {

  var element;

  beforeEach(function () {
    element = document.createElement('simple-element');
    document.body.appendChild(element);
  });

  afterEach(function () {
    document.body.removeChild(element);
  });

  it('should work', function () {
    console.log(element.sayHello());
  });
});
