(function(){
	'use strict';

	angular.module("souNinja")
	.controller('performPurchaseController', performPurchaseController)

	performPurchaseController.$inject = ['productFactory', '$scope', 'shoppingCartService'];
	function performPurchaseController(productFactory, $scope, shoppingCartService){
		var vm = this;

		(function init(){
			findAllProducts();
			vm.moreItem = moreItem;
			vm.lessItem = lessItem;
			vm.sortBy = sortBy;
			vm.sendToCart = sendToCart;

			$scope.propertyName = 'description';
			$scope.reverse = false;
		})()

		function moreItem(product){
			product.amount++;
		}

		function lessItem(product){
			if(product.amount > 1){
				product.amount--;
			}
		}


		function findAllProducts(){
			productFactory.getAll()
			.then(function(resp){
				vm.allProducts = factoryListProductOrder(resp.data);
				console.log(vm.allProducts)

				var length = shoppingCartService.totalItems();
				while(length--){
					var auxProduct = shoppingCartService.productList[length];
					var index = vm.allProducts.map(function(a){return a.product.idProduct}).indexOf(auxProduct.product.idProduct)
					vm.allProducts.splice(index,1);
				}


			}, function(resp){
				responseError(resp)
			})
		}

		function factoryListProductOrder(listProduct){
			var length = listProduct.length,
				listProductOrder = [];
			while(length--){
				var auxProduct = listProduct[length];
				delete listProductOrder.order;
				listProductOrder.push({
					amount : 1,
					product : angular.copy(auxProduct)
				});
			}

			return listProductOrder

		}

		function sendToCart(product){
			var auxProduct = angular.copy(product)

			var index = vm.allProducts.map(function(a){return a.product.idProduct}).indexOf(product.product.idProduct)
			vm.allProducts.splice(index,1);

			shoppingCartService.productList.push(auxProduct)
		}

		function sortBy(propertyName){
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    		$scope.propertyName = propertyName;
		}
	}
})()