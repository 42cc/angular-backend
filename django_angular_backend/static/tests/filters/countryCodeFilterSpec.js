describe('phoneFilter', function() {

    beforeEach(module('appFilters'));

    describe('countrycode', function() {

        it('should insert (USA) before phone number start with "+1"',
            inject(function(countrycodeFilter) {
                expect(countrycodeFilter('+1 (905) 932-42-23')).toBe('(USA) +1 (905) 932-42-23');
                expect(countrycodeFilter('+3 (905) 932-42-23')).toBe('+3 (905) 932-42-23');
        }));
    });
});