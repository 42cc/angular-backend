describe('Edit Contact Controller', function() {
    var $httpBackend, $rootScope, createController;


    var response = {
        meta: {
            limit: 1000,
            next: null,
            offset: 0,
            previous: null,
            total_count: 13
            },
        objects: [
            {
                birth_date: "1933-03-02",
                cellphone_number: "",
                date_created: "2014-05-24T09:27:44.306000",
                email: "robertabbot@gmail.com",
                first_name: "Robert",
                id: 1,
                jabber_id: "",
                last_name: "Abbott",
                phone_number: "",
                resource_uri: "/api/v1/contact/1"
            },
            {
                birth_date: "1963-09-23",
                cellphone_number: "",
                date_created: "2014-05-24T09:28:20.149000",
                email: "",
                first_name: "Bruce",
                id: 2,
                jabber_id: "",
                last_name: "Ableson",
                phone_number: "",
                resource_uri: "/api/v1/contact/2"
            }
        ]
    };

    beforeEach(module('app'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('/api/v1/contact/').respond(response);
        $httpBackend.whenGET('/api/v1/contact/1').respond(response.objects[0]);
        $httpBackend.whenGET('/api/v1/contact/2').respond(response.objects[1]);

        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('EditContactCtrl', {'$scope' : $rootScope });
        };
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('calls /api/v1/contact/1', function() {
        $httpBackend.expectGET('/api/v1/contact/1');
        var ctrl = createController();
        $httpBackend.flush();
    });

    it("should get contact with id=1", function() {
        var ctrl = createController();
        ctrl.getContact(1);
        $httpBackend.flush();
        expect(ctrl.contact.id).toBe(1);
    });

    it("should change contact name and save", function() {
        var ctrl = createController();
        ctrl.getContact(1);
        $httpBackend.flush();
        ctrl.contact.first_name = 'Ruslan';
        ctrl.contact.last_name = 'Makarenko';
        ctrl.saveContact(1);
        $httpBackend.flush();
        ctrl.getContact(1);
        $httpBackend.flush();
        expect(ctrl.contact.first_name).toEqual('Ruslan');
        expect(ctrl.contact.last_name).toEqual('Makarenko');
    });

});
