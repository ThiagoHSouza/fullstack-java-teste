(function(){
	'use strict'

	angular.module('souNinja')
	.factory('clientFactory', clientFactory);

	clientFactory.$inject = ['$http', 'urlApi'];
	function clientFactory($http, urlApi){
		var service = {}
		service.register = register;
		service.edit = edit;
		service.getAll = getAll;
		service.getByDocumentNumber = getByDocumentNumber;
		service.remove = remove;

		return service;

		function register(client){
			return $http.post(urlApi.client, client);
		}

		function edit(client){
			return $http.put(urlApi.client, client);
		}

		function getAll(){
			return $http.get(urlApi.client)
		}

		function remove(idClient){
			return $http.delete(urlApi.client +"/"+ idClient)
		}

		function getByDocumentNumber(documentNumber){
			return $http.get(urlApi.client + "/document-number/" + documentNumber);
		}

	}


})()