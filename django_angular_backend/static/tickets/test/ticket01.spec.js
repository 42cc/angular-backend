describe('Provides my contact info', function() {
  beforeEach(module('myContactsBook'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('myContactInfoCtrl', function() {
    it('should return my contact info', function() {
      var controller = $controller('myContactInfoCtrl', { });
      expect(controller.contact).toEqual(myContactInfoObj());

	///
	function myContactInfoObj() {
		return {
			firstName : "Dmitry",
			lastName :   "Scheglov",
			birthday : (new Date(1979, 11, 15, 3)).valueOf(),
			bio : "180cm, 72kg",
			eMail : "Dmitry.Scheglov@gmail.com",
			jabber : "scheglovd@42cc.co",
			skype: "Dmitry.Scheglov",
			other : "..."
		};
	}
    });
  });
});
