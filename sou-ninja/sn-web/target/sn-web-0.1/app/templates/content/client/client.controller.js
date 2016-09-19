(function(){
	'use strict';

	angular.module('souNinja')
	.controller('clientController', clientController);

	clientController.$inject = ['$scope', '$mdDialog', 'clientFactory'];
	function clientController($scope, $mdDialog, clientFactory){
		var vm = this;

		(function init(){
			findAllClient();

			vm.allClients = [];
			vm.showClientRegister = showClientRegister;
			vm.showClientEdit = showClientEdit;
			vm.saveClient = saveClient;
			vm.verifyDocumentNumeber = verifyDocumentNumeber;
			vm.showConfirmRemove = showConfirmRemove;	

			vm.cancel = cancel;

			vm.showConfirmCancel = showConfirmCancel;

			$scope.displayInformation = false
			$scope.validateErrorMessage = validateErrorMessage;

		})()

		function showClientEdit(client){
			vm.client = angular.copy(client);
			$scope.auxNumberDocument = client.documentNumber.replace(/[\D]/g,'');
			$scope.edit = true;
			$scope.displayInformation = true;

		}

		function showClientRegister(){
			vm.client = {};
			$scope.displayInformation = true;
		}

		function cancel(){
			delete vm.errorMsg;
			$scope.edit = false;
			$scope.displayInformation = false;
		}

		function verifyDocumentNumeber(documentNumber, form){

			var errorTypeAlreadyExists = "number-document-already-exists",
				errorTypeInvalidDocument = "number-document-invalid";

			validField(form, errorTypeAlreadyExists)									
			validField(form, errorTypeInvalidDocument)
			
			if(!documentNumber){ console.log(form);return}

			$scope.checkingNumberDocument = true;
			clientFactory.getByDocumentNumber(documentNumber)
			.then(function(response){

				console.log($scope.auxNumberDocument, documentNumber)

				if(!$scope.edit || $scope.auxNumberDocument != documentNumber){
					invalidField(form, errorTypeAlreadyExists)
				}
			}, function(response){
				if(response.status == 404){
					validField(form, errorTypeAlreadyExists)									
					validField(form, errorTypeInvalidDocument)									
				}else if(response.status == 400){
					invalidField(form, errorTypeInvalidDocument)
				}				
			}).then(function(){
				$scope.checkingNumberDocument = false;
			});
		}

		function validField(form, typeError){
			delete form.$error[typeError]
			form.$setValidity(typeError, true)

			if(Object.keys(form.$error).length == 0){
				form.$valid = true
				form.$invalid = false
			}
		}

		function invalidField(form, typeError){
			form.$setValidity(typeError, false)
			form.$valid = false
			form.$invalid = true
		}

		function saveClient(client, form){
			if(form.$invalid){ 
				vm.errorMsg = {
					ERROR : "Favor preencher todos os campos corretamente."
				}
				return;
			}
			if(!$scope.edit){
				registerClient(client)
			}else{
				editClient(client)
			}			
		}

		function registerClient(client){

			clientFactory.register(client)
			.then(function(response){
				vm.errorMsg = {};
				vm.errorMsg['SUCCESS'] = 'Cliente registrado com sucesso.';
				$scope.displayInformation = false;
				vm.client = {};
				vm.allClients.push(response.data)

			}, function(response){
				var resp = response.data;
				vm.errorMsg = {};
				vm.errorMsg[resp.type] = resp.message;
			})
		}

		function showConfirmRemove(ev, client){
			var dialog = {
				title: 'Remover cliente',
				text: 'Deseja remover o cliente selecionado.',
			}
			showConfirm(dialog, ev, function(){
				vm.errorMsg = {}
				delete client.$$hashKey;
				delete client.order;
				clientFactory.remove(client.idClient)
				.then(function(response){
					var index = vm.allClients.map(function(a){ return a.idClient }).indexOf(client.idClient);
					vm.allClients.splice(index, 1);
					vm.errorMsg['SUCCESS'] = 'Cliente removido com sucesso.';
				}, function(response){
					vm.errorMsg[response.data.type] = response.data.message;
				})
			})
		}

		function editClient(client){
			clientFactory.edit(client)
			.then(function(response){
				vm.errorMsg = {};
				vm.errorMsg['SUCCESS'] = 'Informações alteradas com sucesso.';
				
				$scope.displayInformation = false;
				$scope.edit = false;

				vm.client = {};
				
				var index = vm.allClients.map(function(a){ return a.idClient }).indexOf(client.idClient);
				vm.allClients[index] = client;

			}, function(response){
				var resp = response.data;
				vm.errorMsg = {};
				vm.errorMsg[resp.type] = resp.message;
			})
		}

		function findAllClient(){
			clientFactory.getAll()
			.then(function(resp){
				vm.allClients = resp.data;
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


		function validateErrorMessage(form, parent){
			return form.$invalid && (form.$touched || parent.$submitted)
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