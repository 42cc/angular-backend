(function() {
"use strict"
	var app = angular.module("contactsTable", []);
	
	app.directive("contactsTable", function () {
		return {
			restrict: "E",
			scope : {
				contacts : "=bind",
				pageSize : "=pageSize",
				activePage : "=activePage",
				allowOrdering : "=allowOrdering",
				allowFilter : "=allowFilter"
			},
			
			controller : ["$scope", function ($scope) {
				var  vm = this
					,vm.contacts = $scope.contacts
					,vm.filterWith
					,vm.orderBy
					,vm.activePage = $scope.activePage || 1
					// protected fields
					
					,pageSize = $scope.pageSize || 5
					,pageCount 
					,allowFilter =$scope.allowFilter || true
					,allowOrder = $scope.allowOdering || true
					;
				
				vm.currentLength = function () {
					return $scope.filteredContacts && $scope.filteredContacts.length ||
						   vm.contacts.length;
				};
					
				vm.allowFilter = function() {
					return allowFilter || false;
				};
				
				vm.allowOrder = function() {
					return allowOrdeer || false;
				};
				
				vm.allowPagination = function () {
					return typeof pageSize == 'number' && pageSize > 0;
				};
				
				vm.pageCount = function () {
					if (vm.allowPagination()) {
						pageCount  = Math.ceil(vm.currentLength() / pageSize);
					} else {
						pageCount = 1;
					}
					return pageCount;

				};
				
				vm.currentPage = function (aPage) {
					if (!vm.allowPagination()) {
						return vm.activePage = 1;
					};
					aPage = aPage || vm.activePage || 1;
					vm.activePage = aPage > vm.pageCount() ? vm.pageCount() : vm.activePage;
					return vm.activePage;
				};
				
				vm.allowNextPage = function () {
					return vm.allowPagination () && (vm.currentPage() < vm.pageCount());
				}
				
				vm.nextPage = function () {
					if (vm.allowNextPage()) {
						vm.currentPage(activePage + 1);
						return true;
					}
					return false;
				}
				
				vm.allowPrevPage = function () {
					return vm.allowPagination() && (vm.currentPage() > 1);
				};
				
				vm.prevPage = function () {
					if (vm.allowPrevPage()) {
						vm.currentPage(vm.activePage - 1)
					}
				};
				
				vm.end = function () {
					if (!vm.allowPagination()) return vm.currentLength() - 1;
					var end = vm.start() + vm.pageSize-1;						
					return (end < vm.currentLength()?end:vm.currentLength()-1);
				}
				
				vm.start = function () {
					if (!vm.allowPagination()) return 0;
					var start = (vm.currentPage()-1) * vm.pageSize;
					return (start < 0?0:start);
				}
				
				vm.onCurrentPage = function(index) {
					if (!vm.allowPagination()) {
						return true;
					};
					
					return index >=  vm.start() && index <= vm.end();
				};
				
				$scope.$watch("self.filterWith + self.orderBy", function() {
					activePage = 1;
				});
				
				$scope.$watch("self.pageSize", function (newVal, oldVal) {
					var oldStart = (activePage-1) * oldVal;
					activePage = Math.ceil(oldStart / newVal);
				});
				
			}],
			controllerAs : "self"
			templateUrl: '../partials/contacts-table-static.html'
		};
	});
	

})()