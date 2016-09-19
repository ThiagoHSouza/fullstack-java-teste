(function(){
	'use strict';

	angular.module('souNinja')
	.factory('orderFactory', orderFactory);

	orderFactory.$inject = ['$http', 'urlApi'];
	function orderFactory($http, urlApi){
		var service = {}
		service.register = register;
		service.update = update;
		service.getAll = getAll; 
		service.remove = remove;

		return service;

		function register(order){
			return $http.post(urlApi.order, order);
		}

		function getAll(){
			return $http.get(urlApi.order);
		}

		function update(order){
			return $http.put(urlApi.order, order);
		}

		function remove(idOrdem){
			return $http.delete(urlApi.order + "/" + idOrdem);
		}

	}
})()