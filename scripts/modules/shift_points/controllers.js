{
    const app = angular.module('ir.internal.shift_points.controllers', [
    ])

    app.controller('ShiftPointsCtrl', ['$scope', 'Cars', 'ShiftPoints', function($scope, Cars, ShiftPoints) {
        $scope.cars   = Cars.get()
        $scope.shifts = ShiftPoints.get()

        $scope.carId = null
        $scope.gears = {}

        $scope.$watch('carId', function(n, o) {
            if (!n) {
                return
            }

            if (!$scope.shifts.hasOwnProperty(n)) {
                $scope.gears = {}
                return
            }

            $scope.gears = $scope.shifts[n]
        })

        $scope.$watch('gears', function(n, o) {
            if (!n || !_.keys(n).length || !_.sum(_.values(n))) {
                delete $scope.shifts[$scope.carId]
                return
            }

            $scope.shifts[$scope.carId] = n;
        }, true)

        $scope.save = function(shifts) {
            ShiftPoints.set(shifts)
        }
    }])
}
