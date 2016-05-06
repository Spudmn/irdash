{
    const app = angular.module('ir.internal.dashboards', [
        'ir.internal.dashboards.controllers',
        'ir.internal.dashboards.services'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/dashboards', {
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl',
            })
    }])
}
