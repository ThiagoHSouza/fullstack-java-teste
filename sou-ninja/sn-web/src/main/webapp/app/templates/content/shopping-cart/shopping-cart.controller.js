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
			vm.checkout = checkout;
			vm.showConfirmRemove = showConfirmRemove;


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
				console.log(vm.allClients)
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