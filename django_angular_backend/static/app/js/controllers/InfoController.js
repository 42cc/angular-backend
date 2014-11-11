(function() {
    'use strict';

    angular.module('app')
        .controller('InfoCtrl', InfoCtrl);

    function InfoCtrl() {
        var vm = this;

        vm.myInfo = {
            'First Name':    'Ruslan',
            'Last Name':     'Makarenko',
            'Date of birth': '01.12.1986',
            'Email':         'ruslan.makarenko@gmail.com',
            'Jabber':        'macruss@jabber.kiev.ua'
        };
    };
    
})();