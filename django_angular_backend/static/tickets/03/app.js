var app = angular.module("myContactsBook", ['ngRoute', 'menus', 
					,	'contactsTableStatic'
					,	'contactsList'
					,	'contactDetails'
					,	'contactsManager'
					]);

app.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider
		.when('/', {
			redirectTo: '/contacts'
	    })
    	.when('/contacts', {
	        templateUrl: '../partials/contacts-list-page.html',
	        controller: 'contactsListCtrl',
			controllerAs: 'listOf'
	    })
	    .when('/contacts/:contactId', {
	    	templateUrl: '../partials/contact-details-page.html',
	    	controller: 'contactsManagerCtrl',
	    	controllerAs: "the"
	    })
	    .otherwise({
	    	redirectTo: '/'
	    });
}]);
