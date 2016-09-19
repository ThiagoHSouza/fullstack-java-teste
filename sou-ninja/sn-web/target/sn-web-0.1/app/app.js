(function(){
	'use strict';

	angular.module('souNinja', [
		'ui.router', 
		'ngMaterial', 
		'ngMessages',
		'uiCurrency',
		'ui.mask'
	])

	.config(config)
	.run(run)
	.constant('urlApi', {
		order: 'http://localhost:8080/sn-rest-0.1/api/order',
		client: 'http://localhost:8080/sn-rest-0.1/api/client',
		product: 'http://localhost:8080/sn-rest-0.1/api/product'
	});

	config.$inject = ['$stateProvider'];
	function config($stateProvider){
		$stateProvider
		.state('index', {
			url:'/',
	      	abstract: true,	    	
	    	templateUrl: 'app/home.view.html',
	    	controller: "homeController",
        	controllerAs: "homeCtrl"
		})

		.state('index.purchase', {
			url:"^/purchase",
			resolve: {
				name: function(){
					return 'Realizar Compra';
				}
			},
	    	views: {
		        "toolbar": { templateUrl: "app/templates/toolbar/toolbar.view.html" },
			    "sidenav":{ templateUrl: "app/templates/sidenav/sidenav.view.html" },
			    "content":{
		        	templateUrl: "app/templates/content/perform-purchase/perform-purchase.view.html",
		        	controller: "performPurchaseController",
		        	controllerAs: "purcCtrl"
			    }
	      	}
		})


		.state('index.order', {
			url:"^/order",
			resolve: {
				name: function(){
					return 'Ordens de Compra';
				}
			},
	    	views: {
		        "toolbar": { templateUrl: "app/templates/toolbar/toolbar.view.html" },
			    "sidenav":{ templateUrl: "app/templates/sidenav/sidenav.view.html" },
			    "content":{
		        	templateUrl: "app/templates/content/list-order/list-order.view.html",
		        	controller: "orderController",
		        	controllerAs: "orderCtrl"
			    }
	      	}
		})



		.state('index.product', {
			url:"^/product",
			resolve: {
				name: function(){
					return 'Produtos';
				}
			},
	    	views: {
		        "toolbar": { templateUrl: "app/templates/toolbar/toolbar.view.html" },
			    "sidenav":{ templateUrl: "app/templates/sidenav/sidenav.view.html" },
			    "content":{
		        	templateUrl: "app/templates/content/product/product.view.html",
		        	controller: "productController",
		        	controllerAs: "prodCtrl"
			    }
	      	}
		})

		.state('index.client', {
			url:"^/client",
			resolve: {
				name: function(){
					return 'Clientes';
				}
			},
	    	views: {
		        "toolbar": { templateUrl: "app/templates/toolbar/toolbar.view.html" },
			    "sidenav":{ templateUrl: "app/templates/sidenav/sidenav.view.html" },
			    "content":{
		        	templateUrl: "app/templates/content/client/client.view.html",
		        	controller: "clientController",
		        	controllerAs: "clientCtrl"
			    }
	      	}
		})

	}

	run.$inject = [];
	function run(){

	}

})()