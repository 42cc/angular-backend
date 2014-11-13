(function(){
    'use strict';

    angular.module('app')
        .factory('contacts', contacts);

    contacts.$inject = ['$http'];

    function contacts($http) {
        return {
            getContacts: getContacts
        };

        function getContacts() {
            return $http.get('/api/v1/contact')
                .then(getContactsComplete)
                .catch(getContactsFailed);

            function getContactsComplete(respons) {
                return respons.data.objects;
            }

            function getContactsFailed(error) {
                console.log('XHR Failed for contacts ' + error.data);
            }
        }
    };
})();