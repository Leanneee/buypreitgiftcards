
var module = angular.module('mainApp');


module.directive('onFinishRender', function () {
    return {
        restrict: '',
        link: function (scope, element, attr) {
               
            if (scope.$last) {
                $('.jcarousel').jcarousel('reload', {
                });
            }
        }
    }
});


