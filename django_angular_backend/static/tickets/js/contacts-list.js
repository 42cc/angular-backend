(function () {
'use strict'
	
	var app = angular.module("contactsList", ['contactServices']);
		
	app.controller("contactsListCtrl",  ['$http', 'Contact', function ($http, Contact) {
		
		this.contacts = Contact.query();
		

	}]);

})();