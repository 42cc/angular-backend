(function() {
"use strict"
	var app = angular.module("contactDetails", []);
	
	app.directive("contactDetailsForm", function () {
		return {
			restrict: "E",
			scope : {
				manager : "=bind"
			},
			controller : ["$scope", function ($scope) {
				var vm = this;
				
				vm.allowSave = function () {
					return !$scope.manager.processingRequest && $scope.contactDetailsForm.$dirty;
				};
				
				vm.showResult = function() {
					return $scope.manager.resultMessage && $scope.contactDetailsForm.$pristine;
				};
				
				vm.isRunning = function(){
					return $scope.manager.processingRequest;
				}
			
				$scope.$watch('manager.statusResult', function() {
					if ($scope.manager.statusResult == 'success') {
						$scope.contactDetailsForm.$setPristine();	
					}
				});
				
			}],
			controllerAs : 'self',
			templateUrl: '../partials/contact-details-form.html'
		};
	});
	

})()