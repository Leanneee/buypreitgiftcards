(function () {
    var app = angular.module("mainApp", ['ngCookies', 'ngSanitize', 'vcRecaptcha']);
    angular.module("mainApp", ['ngCookies', 'ngSanitize', 'vcRecaptcha'], function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
}())