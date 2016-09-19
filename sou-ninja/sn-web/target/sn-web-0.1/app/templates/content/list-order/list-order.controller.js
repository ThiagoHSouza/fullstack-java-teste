(function(){
	'use strict';

	angular.module('souNinja')
	.controller('orderController', orderController);

	orderController.$inject = ['$scope', 'clientFactory', 'shoppingCartService', 'orderFactory'];
	function orderController($scope, clientFactory, shoppingCartService, orderFactory){
		var vm = this;

		$scope.displayInformation = false;

		(function init(){
			findAllClient();

			vm.productList = shoppingCartService.productList;
			vm.valueTotal = shoppingCartService.getValueTotal()
			vm.clientSelected = clientSelected;
			vm.moreItem = moreItem;
			vm.lessItem = lessItem;
			vm.checkout = checkout

			$scope.querySearch = querySearch;


		})()


		// --------------------------------------

		function findAllClient(){
			clientFactory.getAll()
			.then(function(resp){
				vm.allClients = resp.data;
				var idClient = shoppingCartService.client.idClient
				if(idClient){
					var index = vm.allClients.map(function(a){return a.idClient}).indexOf(idClient)
					vm.client = vm.allClients[index]
					
				}
				console.log(vm.allClients)
			}, function(resp){
				responseError(resp)
			})
		}

	 	function querySearch (query) {
	      	return query ? vm.allClients.filter( createFilterFor(query) ) : self.states;
	    }

	    function createFilterFor(query) {
	      	var lowercaseQuery = angular.lowercase(query);

	      	return function filterFn(client) {
	        	return (client.name.indexOf(lowercaseQuery) === 0);
	      	};

	    }

	    function clientSelected(client){
	    	shoppingCartService.client = client;
	    }


		
		function moreItem(product){
			product.amount++;
			vm.valueTotal = shoppingCartService.getValueTotal()
		}

		function lessItem(product){
			if(product.amount > 1){
				product.amount--;
				vm.valueTotal = shoppingCartService.getValueTotal()
			}
		}

		function checkout(){
			var order = {
				client : angular.copy(shoppingCartService.client),
				productList: angular.copy(shoppingCartService.productList)
			}
			console.log(order)

			orderFactory.register(order)
			.then(function(resp){
				console.log(resp)
			}, function(resp){
				console.log(resp)
			})
		}




	}
})()