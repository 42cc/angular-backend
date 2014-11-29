(function() {
"use strict"
	angular
		.module('contactServices', ['ngResource'])
		.factory("Contact", factoryContract);

		factoryContract.$inject = ['$resource', '$http'];

		function factoryContract($resource, $http) {
	

			var Contact = $resource('/api/v1/contact/:id', {id : "@id"},					
				{
					query: {
						method:'GET', 
						transformResponse : appendResponseTransformers(), 
						isArray:true
					}
				}
			);
		

			return Contact;

			function newTransformResponse(data) {
				return (data&&data.objects);
			};

			function appendResponseTransformers() {
				var A=$http.defaults.transformResponse;
				return (angular.isArray(A)?A:[A]).concat(newTransformResponse);
				
			}
	
		}
})();
