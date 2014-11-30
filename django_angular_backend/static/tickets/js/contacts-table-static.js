(function() {
"use strict"
	var app = angular.module("contactsTableStatic", []);
	
	app.directive("contactsTableStatic", function () {
		return {
			restrict: "E",
			scope : {
				contacts : "=bind"
			},
			controller : ["$scope", function ($scope) {

			}],
			templateUrl: '../partials/contacts-table-static.html'
		};
	});
	

})()