var app = angular.module("myContactsBook", ['ngRoute', 'menus', 'placement'
					,	'contactsTableStatic'
					,	'contactsList'
					]);

app.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
	 when('/contacts', {
        templateUrl: '../partials/contacts-list-page.html',
        controller: 'contactsListCtrl',
		controllerAs: 'listOf'
      }).      
      otherwise({
        redirectTo: '/'
      });
}]);
