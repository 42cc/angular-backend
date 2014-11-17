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
        vm.curPage = 0;
        vm.pageSize = 5;
        vm.pageSizes = [2, 5, 10];
        vm.numberOfPages = numberOfPages;
        vm.isLastPage = isLastPage;
        vm.isFirstPage = isFirstPage;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;

        activate();

        function activate() {
            return contacts.getContacts()
                .then(function(data) {
                    vm.contacts = data;
                    return vm.contacts;
            });
        }

        function numberOfPages() {
            return Math.ceil(vm.contacts.length / vm.pageSize);
        }

        function isLastPage() {
            return vm.curPage >= vm.contacts.length/vm.pageSize - 1;
        }

        function isFirstPage() {
            return vm.curPage == 0;
        }

        function nextPage() {
            vm.curPage += 1;
        }

        function prevPage() {
            vm.curPage -= 1;
        }
    }
})();