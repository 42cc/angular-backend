(function() {
    'use strict';

    angular.module('app',['ngRoute'])
        .config(config);

        function config($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'static/partials/main.html',
                    controller: 'InfoCtrl',
                    controllerAs: 'info'
                })
                .when('/contacts', {
                    templateUrl: 'static/partials/contacts.html',
                    controller: 'ContactsCtrl',
                    controllerAs: 'contacts'
                })
                .otherwise({
                    redirectTo: '/'
                });

        }
    
})();