(function(){
	'use strict';

	angular.module('souNinja')
	.controller('orderController', orderController);

	orderController.$inject = ['$scope', '$mdDialog', 'clientFactory', 'shoppingCartService', 'orderFactory'];
	function orderController($scope, $mdDialog, clientFactory, shoppingCartService, orderFactory){
		var vm = this;

		$scope.displayInformation = false;

		(function init(){
			findAllOrders();
			findAllClient();

			vm.clientSelected = clientSelected;
			vm.moreItem = moreItem;
			vm.lessItem = lessItem;
			vm.checkout = checkout;
			vm.showConfirmRemove = showConfirmRemove;
			vm.showConfirmEdit = showConfirmEdit;
			vm.showOrderEdit = showOrderEdit;
			vm.cancel = cancel;


			$scope.dateNow = new Date();
		})()


		// --------------------------------------

		function findAllOrders(){
			orderFactory.getAll()
			.then(function(resp){
				vm.allOrders = resp.data;

			}, function(resp){
				responseError(resp)
			})
		}

		function findAllClient(idClient){
			clientFactory.getAll()
			.then(function(resp){
				vm.allClients = resp.data;

				console.log(vm.allClients)
			}, function(resp){
				responseError(resp)
			})
		}

		function checkFieldClient(idClient){
			if(idClient){
				var index = vm.allClients.map(function(a){return a.idClient}).indexOf(idClient)
				vm.client = vm.allClients[index]
				
			}

		}

		function showOrderEdit(order){
			$scope.editOrder = angular.copy(order)
			$scope.idOrderEdit = order.idOrder;
			$scope.displayInformation = true;
			checkFieldClient(order.client.idClient);

		}

		function getValueTotal(listProduct){
			var length = listProduct.length,
				valueTotal = 0;
			while(length--){
				var aux = listProduct[length];
				valueTotal += aux.product.unitaryValue * aux.amount;
			}
			return valueTotal;
		}

		function cancel(){
			delete $scope.idOrderEdit;
			$scope.displayInformation = false;

		}

	    function clientSelected(client){
	    	shoppingCartService.client = client;
	    }
		
		function moreItem(product){
			product.amount++;
			$scope.editOrder.totalValue = getValueTotal($scope.editOrder.productList)
		}

		function lessItem(product){
			if(product.amount > 1){
				product.amount--;
				$scope.editOrder.totalValue = getValueTotal($scope.editOrder.productList)
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

		function showConfirmEdit(ev, order){
			var dialog = {
				title: 'Alterar ordem de compra',
				text: 'Deseja alterar a ordem selecionada?',
			}
			showConfirm(dialog, ev, function(){

				delete order.$$hashKey;
				delete order.$$mdSelectId;
				delete order.totalValue;

				orderFactory.update(order)
				.then(function(resp){
					var index = vm.allOrders.map(function(a){return a.idOrder}).indexOf(resp.data.idOrder);
					vm.allOrders[index] = resp.data
					$scope.displayInformation = false;
					delete $scope.idOrderEdit
				})


				console.log(order)
				
			})
		}

		function showConfirmRemove(ev, idOrder){
			var dialog = {
				title: 'Remover Ordem de Compra',
				text: 'Deseja remover a ordem selecionada?',
			}
			showConfirm(dialog, ev, function(){

				orderFactory.remove(idOrder)
				.then(function(resp){
					var index = vm.allOrders.map(function(a){return a.idOrder}).indexOf(idOrder);
					vm.allOrders.splice(index, 1)
				})

				
			})
		}

		function showConfirm(dialogObj, ev, confirmAction, cancelAction) {
		    var confirm = $mdDialog.confirm()
		          .title(dialogObj.title)
		          .textContent(dialogObj.text)
		          .ariaLabel('confirmar')
		          .targetEvent(ev)
		          .ok('Confirmar')
		          .cancel('Cancelar');

		    $mdDialog.show(confirm).then(confirmAction, cancelAction);
	  	};

		$scope.mouseEnterTable = function(id){
			$scope.trOver = id;
		}
		$scope.mouseLeaveTable = function(id){
			$scope.trOver = null;
		}


	}
})()