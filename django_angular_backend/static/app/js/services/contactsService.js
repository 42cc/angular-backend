(function(){
    'use strict';

    angular.module('app')
        .factory('contacts', contacts);

    contacts.$inject = ['$http'];

    function contacts($http) {
        return {
            getContacts: getContacts,
            getContact: getContact,
            updateContact: updateContact
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

        function getContact(id) {
            return $http.get('/api/v1/contact/' + id)
                .then(getContactComplete)
                .catch(getContactFailed);

            function getContactComplete(respons) {
                return respons.data;
            }

            function getContactFailed(error) {
                console.log('XHR Failed for contacts ' + error.data);
            }
        }

        function updateContact(contact) {
            return $http.put('/api/v1/contact/' + contact.id, contact)
                .then(updateContactComplete)
                .catch(updateContactFailed);

            function updateContactComplete(respons) {
                return respons.status;
            }

            function updateContactFailed(error) {
                console.log('XHR Failed for contact ' + error.data);
            }
        }
    };
})();