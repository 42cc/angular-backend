(function() {
    'use strict';

    angular
        .module('app')
        .directive('phoneNumber', phoneNumber);

    var PHONE_NUMBER_REGEXP = /\+\d{11}$/;

    function phoneNumber () {

        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$validators.phoneNumber = phoneNumber;

            function phoneNumber(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue))
                    return true;

                if (PHONE_NUMBER_REGEXP.test(viewValue))
                    return true;

                return false;
            }
        }
    }
})();