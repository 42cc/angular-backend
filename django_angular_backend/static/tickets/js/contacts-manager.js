(function () {
"use strict"
	var app = angular.module("contactsManager", ['ngRoute', 'contactServices']);
		
	app.controller("contactsManagerCtrl", contactManagerCtrl);
	
	contactManagerCtrl.$inject = ['$http', '$routeParams', 'Contact'];
    function contactManagerCtrl($http, $routeParams, Contact) {
		var cCode = $routeParams.contactId
			,vm = this;

		// interface declaration and implementatio
		vm.processingRequest = false;
		vm.resultMessage = "";
		vm.statusResult = null;
		
		vm.save = function () {
			if (vm.contact == undefined || vm.contact == null) return;
			if (vm.contact.id) {
				vm.processingRequest = true;
				Contact.update({id: vm.contact.id}, vm.contact).$promise
					.then(processSuccess)
					.catch(processError);
			} else {
				this.contact.$save()
					.then(processSuccess)
					.catch(processError);
			}
			
		}
		
		// controller linking code
		if (cCode == 0) {
			vm.contact = new Contact();
		} else {
			vm.contact = Contact.get({id : cCode}, function (aC) {
				console.log(aC.first_name)
			});
		}
		
		// helpers for implementation
		function processSuccess() {
			vm.processingRequest = false;
			vm.statusResult = "success"
			vm.resultMessage = "Contact saved successfully."
		}
		function processError(err) {
			vm.processingRequest = false;
			vm.statusResult = "error"
			vm.resultMessage = err.message;
		};

	};

})();