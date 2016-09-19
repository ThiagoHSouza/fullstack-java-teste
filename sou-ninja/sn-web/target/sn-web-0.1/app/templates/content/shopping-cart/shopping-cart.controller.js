(function(){
	'use strict';

	angular.module('souNinja')
	.controller('shoppingCartController', shoppingCartController);

	shoppingCartController.$inject = ['$scope', '$mdDialog', 'clientFactory', 'shoppingCartService', 'orderFactory'];
	function shoppingCartController($scope, $mdDialog, clientFactory, shoppingCartService, orderFactory){
		var vm = this;

		$scope.displayInformation = false;

		(function init(){
			findAllClient();

			vm.productList = shoppingCartService.productList;
			vm.valueTotal = shoppingCartService.getValueTotal()
			vm.clientSelected = clientSelected;
			vm.moreItem = moreItem;
			vm.lessItem = lessItem;
			vm.showConfirmRemove = showConfirmRemove;
			vm.showConfirmSave = showConfirmSave


			$scope.dateNow = new Date();
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
			}, function(resp){
				responseError(resp)
			})
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

		function showConfirmSave(ev){
			var dialog = {
				title: 'Finalizar',
				text: 'Deseja finalizar o pedido?',
			}
			showConfirm(dialog, ev, checkout)
		}

		function checkout(){
			var order = {
				client : angular.copy(shoppingCartService.client),
				productList: angular.copy(shoppingCartService.productList)
			}

			orderFactory.register(order)
			.then(function(resp){
				cleanCart()
				vm.errorMsg = {
					SUCCESS: "Pedido realizado com sucesso",
				}

			}, function(resp){
			})
		}

		function cleanCart(){
			shoppingCartService.productList = []
			shoppingCartService.client = {};
			delete vm.client;
			delete vm.valueTotal;
			delete vm.productList;


		}

		function showConfirmRemove(ev, idProduct){
			var dialog = {
				title: 'Remover produto',
				text: 'Deseja remover o produto selecionado.',
			}
			showConfirm(dialog, ev, function(){
				shoppingCartService.removeByIdProduct(idProduct)
				vm.valueTotal = shoppingCartService.getValueTotal()
				
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