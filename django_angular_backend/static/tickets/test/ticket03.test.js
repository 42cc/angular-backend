// spec.js
describe('ticket 3: Contact Details Form', function() {

it('mock $http and prepare test data', function(){
    var httpBackendMock = function() {
      angular.module('httpBackendMock', ['ngMockE2E', 'myContactsBook'])
        .run(function($httpBackend) {
			  $httpBackend.whenGET(/^\/api\/v1\/contact\/[0-9]+/).respond(function (method, url) {
				  var cID = parseInt(url.split("/").pop(),10);
				  var contact = someContacts(cID);
				  return [200, contact, {"content-type" : "application/json"}, ""];
			  });
			  $httpBackend.whenGET(/^\/api\/v1\/contact\/?/).respond(someContacts());

			  $httpBackend.whenGET(/^\static\//).passThrough();
			  $httpBackend.whenGET(/^\.\.\//).passThrough();
			  //$httpBackend.whenPOST('/api/packages').respond(200, {} );
			  
			  $httpBackend.whenPUT(/^\/api\/v1\/contact\/[0-9]+/).respond(
					  function (method, url, data) {
						  var cID = parseInt(url.split("/").pop(),10),
						  	tData = someContacts().objects; 
						  tData[cID % tData.length] = data;
						  return [204, "", {}, ""];
					  }
			  );
        });
      
       function someContacts(someOne) {
    		var Data = someContacts.Data;
    		if (typeof someOne == 'number') {
    			return Data.objects[someOne % Data.objects.length];
    		} else {
    			return Data;
    		}
    	}
	    someContacts.Data = { 
			"meta": {
				"limit": 1000,
				"next": null,
				"offset": 0,
				"previous": null,
				"total_count": 4
			},
			"objects": [ 
			    { 
					"birth_date": "1979-11-28",
					"cellphone_number": "",
					"date_created": "2014-05-24T09:33:05.560000",
					"email": "nateparker@gmail.com",
					"first_name": "Nate ",
					"id": 8,
					"jabber_id": "",
					"last_name": "Parker",
					"phone_number": "+17401390420",
					"resource_uri": "/api/v1/contact/8"
			    }
			    , { 
					"birth_date": "1982-05-12",
					"cellphone_number": "",
					"date_created": "2014-05-24T09:33:57.253000",
					"email": "",
					"first_name": "Paul",
					"id": 9,
					"jabber_id": "paul@jgoogl.com",
					"last_name": "Irish",
					"phone_number": "",
					"resource_uri": "/api/v1/contact/9"
			    }
			    , {
					"birth_date": "1958-03-24",
					"cellphone_number": "",
					"date_created": "2014-05-24T09:36:27.626000",
					"email": "russ@nelson.com",
					"first_name": "Russ",
					"id": 12,
					"jabber_id": "",
					"last_name": "Nelson",
					"phone_number": "",
					"resource_uri": "/api/v1/contact/12"
			    }
			    , { 
					"birth_date": "1956-08-04",
					"cellphone_number": "",
					"date_created": "2014-05-24T09:37:01.722000",
					"email": "",
					"first_name": "Tim",
					"id": 13,
					"jabber_id": "",
					"last_name": "Paterson",
					"phone_number": "+17501110000",
					"resource_uri": "/api/v1/contact/13"
			    }
			]
		};
    }
    browser.addMockModule('httpBackendMock', httpBackendMock);
  })

 describe('Case 1: reading one of object', function(){ 
	 
	  it('should have a correct title', function() {
		 browser.get('http://127.0.0.1:8000/static/tickets/03/index.html#/contacts/1');
		 browser.waitForAngular();
	     expect(browser.getTitle()).toBe('42cc-Contacts-Ticket 3');
	  });
	
	  it('should fill field with name', function() {
	    expect(element(by.model('manager.contact.first_name')).getAttribute('value')).toBe('Paul');
	  });
	  
	  it('should fill field with surnname', function() {
	    expect(element(by.model('manager.contact.last_name')).getAttribute('value')).toBe('Irish');
	  });
	
	  it('should fill field with birthday', function() {
	    expect(element(by.model('manager.contact.birth_date')).getAttribute('value')).toBe('1982-05-12');
	  });
	
	  it('should fill field with phone_number', function() {
	    expect(element(by.model('manager.contact.cellphone_number')).getAttribute('value')).toBe('');
	  });
	
	  it('should fill field with skype id', function() {
	    expect(element(by.model('manager.contact.phone_number')).getAttribute('value')).toBe('');
	  });
	
	  it('should fill field with e-mail', function() {
	    expect(element(by.model('manager.contact.email')).getAttribute('value')).toBe('');
	  });
	
	  it('should fill field with jabber', function() {
	    expect(element(by.model('manager.contact.jabber_id')).getAttribute('value')).toBe('paul@jgoogl.com');
	  });
  });

  describe("Case 2: loading another contact and updating it", function(){
	  it('is loading contact#2', function() {
			 browser.get('http://127.0.0.1:8000/static/tickets/03/index.html#/contacts/2');
			 browser.waitForAngular();
	  });
	  
	  it('should be a contact of Russ Nelson', function() {
		    expect(element(by.model('manager.contact.first_name')).getAttribute('value')).toBe('Russ');
		    expect(element(by.model('manager.contact.last_name')).getAttribute('value')).toBe('Nelson');
	  });
	  
	  it('should be disabled to submit', function (){
		 expect(element(by.id('btnSave')).getAttribute('disabled')).toBe('true'); 
	  });
	  
	  it('should accept input the phone_number and make submition allowd', function() {
		 element(by.model('manager.contact.phone_number')).clear();
		 element(by.model('manager.contact.phone_number')).clear().sendKeys('+380123456789'); 
		 expect(element(by.id('btnSave')).getAttribute('disabled')).toBe(null); 
	  });
	  
	  it('should change name to "Dima"', function() {
		 element(by.model('manager.contact.first_name')).clear();
		 element(by.model('manager.contact.first_name')).sendKeys('Dima');  
	  });
	  
	  it('should have chenged values and put contact to server', function (){
		  expect(element(by.model('manager.contact.phone_number')).getAttribute('value')).toBe('+380123456789');
		  element(by.id('btnSave')).click();
		  expect(element(by.model('manager.contact.first_name')).getAttribute('value')).toBe('Dima');
		  expect(element(by.binding('manager.resultMessage')).getText()).toBe('Contact saved successfully.');
		  expect(element(by.id('btnSave')).getAttribute('disabled')).toBe('true'); 
	  });	  
  });


});

