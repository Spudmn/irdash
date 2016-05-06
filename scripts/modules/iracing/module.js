{
    const app = angular.module('ir.internal.iracing', [
        'ir.internal.iracing.controllers',
        'ir.internal.iracing.services'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/iracing', {
                templateUrl: 'views/iracing.html',
                controller: 'iRacingCtrl'
            })
    }])
}
