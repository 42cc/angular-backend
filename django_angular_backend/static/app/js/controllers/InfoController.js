(function() {
    'use strict';

    angular.module('app')
        .controller('InfoCtrl', InfoCtrl);

    function InfoCtrl() {
        var vm = this;

        vm.myInfo = [
            {field:'First Name',    value: 'Ruslan'},
            {field:'Last Name',     value: 'Makarenko'},
            {field:'Date of birth', value: '01.12.1986'},
            {field:'Email',         value: 'ruslan.makarenko@gmail.com'},
            {field:'Jabber',        value: 'macruss@jabber.kiev.ua'}
        ];
    };
    
})();