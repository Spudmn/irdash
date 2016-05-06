{
    const app = angular.module('ir.internal.shift_points', [
        'ir.internal.shift_points.controllers',
        'ir.internal.shift_points.services'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/shift-points', {
                templateUrl: 'views/shift_points.html',
                controller: 'ShiftPointsCtrl'
            })
    }])
}
