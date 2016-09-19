(function(){
	'use strict';

	angular.module('souNinja')
	.factory('orderFactory', orderFactory);

	orderFactory.$inject = ['$http', 'urlApi'];
	function orderFactory($http, urlApi){
		var service = {}
		service.register = register;

		return service;

		function register(order){
			return $http.post(urlApi.order, order);
		}

	}
})()