(function(){
	'use strict';

	angular.module('souNinja')
	.controller('productController', productController);

	productController.$inject = ['$scope', '$mdDialog', 'productFactory'];
	function productController($scope, $mdDialog, productFactory){
		var vm = this;

		(function init(){
			findAllProducts();

			vm.allProducts = [];
			vm.showProductRegister = showProductRegister;
			vm.showProductEdit = showProductEdit;
			vm.saveProduct = saveProduct;
			vm.showConfirmRemove = showConfirmRemove;	

			vm.cancel = cancel;

			vm.showConfirmCancel = showConfirmCancel;

			$scope.displayInformation = false

		})()

		function showProductEdit(product){
			vm.product = angular.copy(product);
			// $scope.auxNumberDocument = product.documentNumber.replace(/[\D]/g,'');
			product.unitaryValue = product.unitaryValue+""
			$scope.edit = true;
			$scope.displayInformation = true;

		}

		function showProductRegister(){
			delete vm.errorMsg;
			vm.product = {};
			$scope.displayInformation = true;
		}

		function cancel(){
			delete vm.errorMsg;
			$scope.edit = false;
			$scope.displayInformation = false;
		}

		function saveProduct(product, form){
			if(form.$invalid){ 
				vm.errorMsg = {
					ERROR : "Favor preencher todos os campos corretamente."
				}
				return;
			}

			product.unitaryValue = product.unitaryValue+"";
			product.unitaryValue = product.unitaryValue.replace('.', '')
			product.unitaryValue = product.unitaryValue.replace(',', '.')
			product.unitaryValue = parseFloat(product.unitaryValue );


			if(!$scope.edit){
				registerProduct(product)
			}else{
				editProduct(product)
			}			
		}

		function registerProduct(product){

			productFactory.register(product)
			.then(function(response){
				vm.errorMsg = {};
				vm.errorMsg['SUCCESS'] = 'Produto registrado com sucesso.';
				$scope.displayInformation = false;
				vm.product = {};
				vm.allProducts.push(response.data)

			}, function(response){
				var resp = response.data;
				vm.errorMsg = {};
				vm.errorMsg[resp.type] = resp.message;
			})
		}

		function showConfirmRemove(ev, product){
			var dialog = {
				title: 'Remover produto',
				text: 'Deseja remover o produto selecionado.',
			}
			showConfirm(dialog, ev, function(){
				vm.errorMsg = {}
				delete product.$$hashKey;
				delete product.order;
				productFactory.remove(product.idProduct)
				.then(function(response){
					var index = vm.allProducts.map(function(a){ return a.idProduct }).indexOf(product.idProduct);
					vm.allProducts.splice(index, 1);
					vm.errorMsg['SUCCESS'] = 'Produto removido com sucesso.';
				}, function(response){
					vm.errorMsg[response.data.type] = response.data.message;
				})
			})
		}

		function editProduct(product){
			productFactory.edit(product)
			.then(function(response){
				vm.errorMsg = {};
				vm.errorMsg['SUCCESS'] = 'Informações alteradas com sucesso.';
				
				$scope.displayInformation = false;
				$scope.edit = false;

				vm.product = {};
				
				var index = vm.allProducts.map(function(a){ return a.idProduct }).indexOf(product.idProduct);
				vm.allProducts[index] = product;

			}, function(response){
				var resp = response.data;
				vm.errorMsg = {};
				vm.errorMsg[resp.type] = resp.message;
			})
		}

		function findAllProducts(){
			productFactory.getAll()
			.then(function(resp){
				vm.allProducts = resp.data;
			}, function(resp){
				responseError(resp)
			})
		}

		function responseError(resp){
			console.log(resp)
		}

		function showConfirmCancel(ev){
			var dialog = {
				title: 'Deseja cancelar?',
				text: 'Caso você confirme, todos os dados não salvos serão perdidos.',
			}
			showConfirm(dialog, ev, cancel);
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