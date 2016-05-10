{
    const app = angular.module('ir.dashboards.formula_renault_20', [
        'ir.dashboards.formula_renault_20.controllers',
        'ir.dashboards.formula_renault_20.directives',
        'ir.internal.dashboards'
    ])

    app.config(['DashboardsProvider', function(DashboardsProvider) {
        DashboardsProvider.add('formula_renault_20', 'Formula Renault 2.0', 74)
    }])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/dashboards/formula_renault_20', {
                templateUrl: 'views/dashboards/formula_renault_20.html',
                controller: 'FormulaRenault20Ctrl'
            })
    }])

}
