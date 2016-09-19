(function(){
	'use strict';

	angular.module('souNinja')
	.factory('shoppingCartService', shoppingCartService)

	shoppingCartService.$inject = [];
	function shoppingCartService(){
		var service = {}
		service.client = {}
		service.productList = []
		service.totalItems = totalItems;
		service.getValueTotal = getValueTotal;
		service.removeByIdProduct = removeByIdProduct;
		return service;

		function totalItems(){
			return service.productList.length;
		}

		function getValueTotal(){
			var length = totalItems(),
				valueTotal = 0;
			while(length--){
				var aux = service.productList[length];
				valueTotal += aux.product.unitaryValue * aux.amount;
			}
			return valueTotal;
		}

		function removeByIdProduct(idProduct){
			service.productList.splice(service.productList.map(function(a){return a.product.idProduct}).indexOf(idProduct), 1);
		}



	}
})()