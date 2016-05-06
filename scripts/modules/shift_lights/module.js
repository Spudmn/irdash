{
    const app = angular.module('ir.internal.shift_lights', [
        'ir.internal.shift_lights.controllers',
        'ir.internal.shift_lights.services'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/shift-lights', {
                templateUrl: 'views/shift_lights.html',
                controller: 'ShiftLightsCtrl',
            })
    }])
}
