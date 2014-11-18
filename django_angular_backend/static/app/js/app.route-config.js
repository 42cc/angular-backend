(function() {
    'use strict';

    angular.module('app')
        .config(config);

        function config($routeProvider) {
            $routeProvider
                .when('/main', {
                    templateUrl: 'static/partials/main.html',
                    controller: 'InfoCtrl',
                    controllerAs: 'info'
                })
                .when('/contacts', {
                    templateUrl: 'static/partials/contacts.html',
                    controller: 'ContactsCtrl',
                    controllerAs: 'contacts'
                })
                .when('/contacts/:contactId', {
                    templateUrl: 'static/partials/edit-contact.html',
                    controller: 'EditContactCtrl',
                    controllerAs: 'edit'
                })
                .otherwise({
                    redirectTo: '/main'
                });

        }
    
})();