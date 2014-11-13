describe("ContactsService", function() {
    var $httpBackend, injector;

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
                    },
                    {
                        birth_date: "1945-12-31",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:28:54.875000",
                        email: "",
                        first_name: "Leonard",
                        id: 3,
                        jabber_id: "",
                        last_name: "Adleman",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/3"
                    },
                    {
                        birth_date: "1976-07-21",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:30:13.729000",
                        email: "",
                        first_name: "Paul ",
                        id: 4,
                        jabber_id: "",
                        last_name: "Allen",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/4"
                    },
                    {
                        birth_date: "1953-04-01",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:30:56.328000",
                        email: "dankottke@gmail.com",
                        first_name: "Daniel ",
                        id: 5,
                        jabber_id: "",
                        last_name: "Kottke",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/5"
                    },
                    {
                        birth_date: "1972-10-10",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:31:31.847000",
                        email: "",
                        first_name: "Matthew ",
                        id: 6,
                        jabber_id: "",
                        last_name: "Haughey",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/6"
                    },
                    {
                        birth_date: "1961-11-02",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:31:56.859000",
                        email: "",
                        first_name: "Michael ",
                        id: 7,
                        jabber_id: "",
                        last_name: "Hawley",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/7"
                    },
                    {
                        birth_date: "1979-11-28",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:33:05.560000",
                        email: "nateparker@gmail.com",
                        first_name: "Nate ",
                        id: 8,
                        jabber_id: "",
                        last_name: "Parker",
                        phone_number: "+17401390420",
                        resource_uri: "/api/v1/contact/8"
                    },
                    {
                        birth_date: "1982-05-12",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:33:57.253000",
                        email: "",
                        first_name: "Paul",
                        id: 9,
                        jabber_id: "paul@jgoogl.com",
                        last_name: "Irish",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/9"
                    },
                    {
                        birth_date: "1976-11-19",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:34:35.618000",
                        email: "",
                        first_name: "Jack",
                        id: 10,
                        jabber_id: "",
                        last_name: "Dorsey",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/10"
                    },
                    {
                        birth_date: "1961-06-12",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:35:29.234000",
                        email: "",
                        first_name: "Kelley ",
                        id: 11,
                        jabber_id: "",
                        last_name: "Deal",
                        phone_number: "+16502530000",
                        resource_uri: "/api/v1/contact/11"
                    },
                    {
                        birth_date: "1958-03-24",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:36:27.626000",
                        email: "russ@nelson.com",
                        first_name: "Russ ",
                        id: 12,
                        jabber_id: "",
                        last_name: "Nelson",
                        phone_number: "",
                        resource_uri: "/api/v1/contact/12"
                    },
                    {
                        birth_date: "1956-08-04",
                        cellphone_number: "",
                        date_created: "2014-05-24T09:37:01.722000",
                        email: "",
                        first_name: "Tim",
                        id: 13,
                        jabber_id: "",
                        last_name: "Paterson",
                        phone_number: "+17501110000",
                        resource_uri: "/api/v1/contact/13"
                    }
            ]
        }

    beforeEach(function() {
        module('app');

        inject(function($injector) {
            injector = $injector;
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', 'api/v1/contact').respond(response);
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("expect get 13 contacts", function() {
        var contacts = injector.get('contacts');
        $httpBackend.flush();
        expect(contacts.get().length).toBe(13);
    });

    it('expect name first contact is Robert', function() {
        var contacts = injector.get('contacts');
        $httpBackend.flush();
        expect(contacts.get()[0].first_name).toEqual('Robert');
        expect(contacts.get()[0].last_name).toEqual('Abbott');
    });
});


