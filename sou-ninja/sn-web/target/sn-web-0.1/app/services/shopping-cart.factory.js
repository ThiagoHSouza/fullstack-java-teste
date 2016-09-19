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



	}
})()