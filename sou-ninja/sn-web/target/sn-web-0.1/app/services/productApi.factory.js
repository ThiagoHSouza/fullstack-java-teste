(function(){
	'use strict'

	angular.module('souNinja')
	.factory('productFactory', productFactory);

	productFactory.$inject = ['$http', 'urlApi'];
	function productFactory($http, urlApi){
		var service = {}
		service.register = register;
		service.edit = edit;
		service.getAll = getAll;
		service.remove = remove;

		return service;

		function register(product){
			return $http.post(urlApi.product, product);
		}

		function edit(product){
			return $http.put(urlApi.product, product);
		}

		function getAll(){
			return $http.get(urlApi.product)
		}

		function remove(idproduct){
			return $http.delete(urlApi.product +"/"+ idproduct)
		}

	}


})()