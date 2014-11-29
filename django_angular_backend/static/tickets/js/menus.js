(function () {

	var app = angular.module("menus", []);
	app.directive("mainMenu", function() {
		return {
			restrict : "E",
			templateUrl: "../partials/main-menu.html",
			scope : {
				place : "=place"
			},
			controller: ['$scope',  function ($scope) {
				this.isActive = function (current) {
					return $scope.place == current;
				}
			}],
			controllerAs : "mainMenuCtrl"
		}
	});

})()