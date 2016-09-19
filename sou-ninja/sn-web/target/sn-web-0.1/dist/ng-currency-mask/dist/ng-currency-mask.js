
  angular.module('uiCurrency', [])
  // .directive('currencyMask', ['$filter', function($filter) {
  .directive('currencyMask', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter('currency')(ctrl.$modelValue, 'R$ ')
            });

            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue.length <= 3) {
                    viewValue = '00'+viewValue;
                }
                var value = viewValue;
                value = value.replace(/\D/g,"");
                value = value.replace(/(\d{2})$/,",$1");
                value = value.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
                var qtdLoop = (value.length-3)/3;
                var count = 0;
                while (qtdLoop > count)
                {
                    count++;
                    value = value.replace(/(\d+)(\d{3}.*)/,"$1.$2");
                }
                var plainNumber = value.replace(/^(0)(\d)/g,"$2");

                elem.val(plainNumber);
                return plainNumber;
            });

            elem.bind('blur', function () {
                var valueFilter = elem.val();
                valueFilter = valueFilter.replace(/\D/g,"");
                if (attrs.zeroFilter == 'true') {
                    if (valueFilter == 0) {
                        elem.val('');
                    }
                }
            });
        }
    };
}]);