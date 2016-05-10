{
    const app = angular.module('ir.internal.dashboards.controllers', [
    ])

    app.controller('DashboardsCtrl', ['$scope', 'Dashboards', function($scope, Dashboards) {
        $scope.dashboards = Dashboards.all()
    }])
}
