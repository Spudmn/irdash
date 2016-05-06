{
    const app = angular.module('ir.dashboards.formula_renault_20', [
        'ir.dashboards.formula_renault_20.controllers',
        'ir.dashboards.formula_renault_20.directives'
    ])

    // app.value('board', 'formula_renault_20')

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/dashboards/formula_renault_20', {
                templateUrl: 'views/dashboards/formula_renault_20.html',
                controller: 'FormulaRenault20Ctrl'
            })
    }])

}
