(function() {
    'use strict';

    angular
        .module('appFilters')
        .filter('pagination', pagination);

    function pagination() {
        return function(input, start) {
            start = +start;

            return input.slice(start);
        };
    }
})();