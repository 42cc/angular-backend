(function(){
    'use strict';

    angular.module('app')
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['contacts'];

    function ContactsCtrl(contacts) {
        var vm = this;
        vm.contacts = [];

        getContacts();

        function getContacts() {
            return contacts.getContacts()
                .then(function(data) {
                    vm.contacts = data;
                    return vm.contacts;
                });
        }
    }
})();