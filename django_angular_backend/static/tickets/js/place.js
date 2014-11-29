(function () {
	var app = angular.module("placement", []);
	app.directive('thePlace', function () {
		return {
			restrict : 'A',
			scope : {
				theUrl : '=thePlace'
			},
			controller : ['$scope', function($scope) {
					if ($scope.theUrl != undefined) {							
						document.location = $scope.theUrl;
					}						
			}]
		}
	});
})()