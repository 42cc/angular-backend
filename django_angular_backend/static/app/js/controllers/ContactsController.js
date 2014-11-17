(function(){
    'use strict';

    angular.module('app')
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['contacts'];

    function ContactsCtrl(contacts) {
        var vm = this;
        vm.contacts = [];
        vm.orderByProps = [
            {title:'Name', predicate:'first_name'},
            {title:'Email', predicate:'email'},
            {title:'Cell phone', predicate:'cellphone_number'},
            {title:'Landline', predicate:'phone_number'},
            {title:'Date of birth', predicate:'birth_date'},
        ];
        vm.orderByProp = vm.orderByProps[0];

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