{
    const app = angular.module('ir.dashboards.mercedes_amg_gt3', [
        'ir.dashboards.mercedes_amg_gt3.controllers',
        'ir.dashboards.mercedes_amg_gt3.directives',
        'ir.dashboards.mercedes_amg_gt3.filters',
    ])

    // app.value('board', 'mercedes_amg_gt3')

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/dashboards/mercedes_amg_gt3', {
                templateUrl: 'views/dashboards/mercedes_amg_gt3.html',
                controller: 'MercedesAmgGt3Ctrl'
            })
    }])
}
