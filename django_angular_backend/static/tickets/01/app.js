var app = angular.module("myContactsBook", []).
	controller("myContactInfoCtrl", function () {
		
		this.contact = {
			firstName : "Dmitry",
			lastName :   "Scheglov",
			birthday : (new Date(1979, 11, 15, 3)).valueOf(),
			bio : "180cm, 72kg",
			eMail : "Dmitry.Scheglov@gmail.com",
			jabber : "scheglovd@42cc.co",
			skype: "Dmitry.Scheglov",
			other : "..."
		};

	});
