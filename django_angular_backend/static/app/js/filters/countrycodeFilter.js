(function() {
    'use strict';

    angular
        .module('appFilters')
        .filter('countrycode', countrycode);

    function countrycode() {
        return function (input) {
            var countryCode = input.slice(0, 2);
            if (countryCode === '+1')
                return '(USA) ' + input;

            return input;
        };
    }
})();