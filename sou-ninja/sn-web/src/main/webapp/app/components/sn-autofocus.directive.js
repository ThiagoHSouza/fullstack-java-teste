(function(){
	'use strict';

	angular.module('souNinja')
	.directive('snAutofocus', snAutofocus);

	snAutofocus.$inject = ['$timeout', '$parse'];
	function snAutofocus($timeout, $parse) {
	  	return {
	  		scope:{
	  			snAutofocus:'='
	  		},
	  		restrict: 'A',
		    link: function(scope, element, attrs) {
				var model = $parse(attrs.snAutofocus);
				scope.$watch('snAutofocus', function(value) {
					if(value) { 
					  	$timeout(function() {
					    	element[0].focus(); 
					  	});
					}
				});
				element.bind('blur', function() {
					if(model && model.assign){
						scope.$apply(model.assign(scope, false));						
					}
				})
		    }
	  	};
	}
})()