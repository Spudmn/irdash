{
    const app = angular.module('ir.dashboards.formula_renault_20.controllers', [])

    app.controller('FormulaRenault20Ctrl', ['$scope', function ($scope) {
        $scope.times = function(times) {
            return _.range(0, times)
        }
    }])
}
