{
    const app = angular.module('ir.internal.shift_points.controllers', [
    ])

    app.controller('ShiftPointsCtrl', ['$scope', 'Cars', 'ShiftPoints', function($scope, Cars, ShiftPoints) {
        $scope.allShiftPoints = ShiftPoints.all()
        $scope.availableCars  = Cars.all()
        $scope.selectedCarId  = null
        $scope.carShiftPoints = {}

        $scope.$watch('selectedCarId', function(n, o) {
            if (!n) {
                return
            }

            if (!$scope.allShiftPoints.hasOwnProperty(n)) {
                $scope.carShiftPoints = {}
                return
            }

            $scope.carShiftPoints = $scope.allShiftPoints[n]
        })

        $scope.$watch('carShiftPoints', function(n, o) {
            if (!n || !_.keys(n).length || !_.sum(_.values(n))) {
                delete $scope.allShiftPoints[$scope.selectedCarId]

                return
            }

            $scope.allShiftPoints[$scope.selectedCarId] = n;
        }, true)

        $scope.save = function(config) {
            if (ShiftPoints.save(config)) {
                $scope.allShiftPoints = ShiftPoints.all()
            }
        }
    }])
}
