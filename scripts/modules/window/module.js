{
    const app = angular.module('ir.internal.window', [
        'ir.internal.window.controllers',
        'ir.internal.window.services'
    ])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/config/window', {
                templateUrl: 'views/window.html',
                controller: 'WindowCtrl',
            })
    }])
}
