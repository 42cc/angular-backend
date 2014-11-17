describe('phoneFilter', function() {

    beforeEach(module('appFilters'));

    describe('countryCode', function() {

        it('should insert (USA) before phone number start with "+1"',
            inject(function(countryCodeFilter) {
                expect(countryCodeFilter('+1 (905) 932-42-23')).toBe('(USA) +1 (905) 932-42-23');
                expect(countryCodeFilter('+3 (905) 932-42-23')).toBe('+3 (905) 932-42-23');
        }));
    })
})