(function(){
	'use strict';

	angular.module('souNinja')
	.directive('snModal', ['$mdDialog', function($mdDialog){
		// Runs during compile
		return {
			scope: {
				title: "=",
				toolbar: "="
			}, 
			restrict: 'AE',
			templateUrl: 'app/components/sn-dialog/sn-dialog.view.html',
			transclude: true,
			link: function($scope, iElm, iAttrs, controller) {				
				$scope.header = ($scope.toolbar === false? false:true)
				$scope.close = function() {
					$mdDialog.cancel();
				};
			}
		};
	}]);
})()