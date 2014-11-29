(function() {

	var app = angular.module("contactsTableStatic", []);
	
	app.directive("contactsTableStatic", function () {
		return {
			restrict: "E",
			scope : {
				contacts : "=bind"
			},
			controller : ["$scope", function ($scope) {
				//alert("");
			}],
			templateUrl: '../partials/contacts-table-static.html'
		};
	});
	

})()