describe('Testing Contact Service', function() {

  beforeEach(function () {
	module('contactServices');
	module('ngResource');
	jasmine.addMatchers(listMatchers());
     }
  );

  var $httpBackend, results, j1, j2, respCode;

  beforeEach(inject(function(_$httpBackend_, Contact){
      $httpBackend = _$httpBackend_;
      srvContact = Contact;
	  $httpBackend.whenGET(/^\/api\/v1\/contact\/[0-9]+$/).respond(function (method, url) {
		  var cID = parseInt(url.split("/").pop(),10);
		  var contact = someContacts().objects[cID];
		  return [200, contact, {"content-type" : "application/json"}, ""];
	  });
	  $httpBackend.when("GET", /^\/api\/v1\/contact\/?$/).respond(someContacts());
	
	  //$httpBackend.whenPOST('/api/packages').respond(200, {} );
	  
	  $httpBackend.whenPUT(/^\/api\/v1\/contact\/[0-9]+$/).respond(
			  function (method, url) {
				  return [204, "", {}, ""];
			  }
	  );
	  results = Contact.query();
	  $httpBackend.flush();
 
	  j1 = Contact.get({id : '1'});
		$httpBackend.flush();

	  j2 = Contact.get({id : '2'});
			$httpBackend.flush();		
		
	  j2.phone_number="+380123456789";
	  Contact.update({id : 2}, j2).$promise.then(
			function () {
				respCode = "ok";
			}
	  );
		$httpBackend.flush();
  }));

  describe('contactServices.query', function() {

    it('should return Nate Parker\' contact info ', function() {
      expect(results).someToEqual(someContacts().objects[0]);
    });

    it('should return Paul irish\' contact info ', function() {
      expect(results).someToEqual(someContacts().objects[1]);
    });

    it('should return Russ Nelson\' contact info ', function() {
      expect(results).someToEqual(someContacts().objects[1]);
    });

    it('should return Tim Peterson\' contact info ', function() {
      expect(results).someToEqual(someContacts().objects[2]);
    });

  });

  describe('contactServices.get #0', function() {

    it('should return Nate Parker\' contact info ', function() {
      expect(j1.id).toEqual(someContacts().objects[1].id);
    });
    
  });

  describe('contactServices.get #2', function() {

    it('should return Russ Nelson\' contact info ', function() {
      expect(j2.id).toEqual(someContacts().objects[2].id);
    });
    
  });
  
  
  describe('contactServices.update #2', function() {
	
	    it('should update Russ Nelson\' contact info with phone_number +380123456789', function() {
	      expect(respCode).someToEqual('ok');
	    });
	    
  });
  
  
 /*   */
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

function listMatchers() {
   return {
	someToEqual : function(util, customEqualityTesters) {
		return {
			compare : function (list, expected) {
				var pass;
				if (list != undefined && list != null) {
					list = list.some instanceof Function ? list : [list];
					pass = list.some(objExp);	
				} else pass = false;
				return {
					pass : pass,
					message : pass ? list +" contains "+expected :
							 list +" doesn't contain the " + expected
				};
				function objExp(a) {
					var p, b=expected;
					for (p in a) 
						if (a.hasOwnProperty(p))
							if (a[p] !== b[p]) return false;
					for (p in b) 
						if (b.hasOwnProperty(p))
							if (b[p] !== a[p]) return false;
					return true;

				}
			}
		}
	}
    }
};
});
