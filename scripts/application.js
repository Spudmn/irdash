(function(angular) {
    'use strict'

    const app = angular.module('irdApp', [
        // angular
        'ngRoute',

        // irdash
        'irdControllers',
        'irdDirectives',
        'irdServices',
        'irdFilters'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config', {
                templateUrl: 'views/config.html',
                controller: 'irdConfigCtrl',
            })
            .when('/', {
                templateUrl: 'views/amggt3.html',
                controller: 'irdAmgGt3Ctrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }])
})(angular)
