{
    const app = angular.module('ir', [
        // angular
        'ngRoute',

        // debug
        'ir.debug',

        // global
        'ir.constants',
        'ir.controllers',
        'ir.directives',
        'ir.factories',
        'ir.providers',
        'ir.services',
        'ir.filters',

        // internal
        'ir.internal.dashboards',
        'ir.internal.iracing',
        'ir.internal.shift_lights',
        'ir.internal.shift_points',
        'ir.internal.window',

        // dashboards
        'ir.dashboards.mercedes_amg_gt3',
        'ir.dashboards.formula_renault_20'
    ])

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true)
    }])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config', {
                templateUrl: 'views/config.html'
            })
            .otherwise({
                redirectTo: '/config/dashboards'
            })
    }])
}
