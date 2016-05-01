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

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/config', {
                templateUrl: 'views/config.html',
                controller: 'irdConfigCtrl',
            })
            .when('/boards', {
                templateUrl: 'views/boards.html',
                controller: 'irdBoardsCtrl'
            })
            .when('/boards/amggt3', {
                templateUrl: 'views/boards/amggt3.html',
                controller: 'irdAmgGt3Ctrl'
            })
            .when('/boards/renault', {
                templateUrl: 'views/boards/renault.html',
                controller: 'irdRenaultCtrl'
            })
            .otherwise({
                redirectTo: '/boards'
            })
    }])
})(angular)
