{
    const app = angular.module('ir.internal.shift_points.controllers', [
    ])

    app.controller('ShiftPointsCtrl', ['$scope', 'Cars', 'ShiftPoints', function($scope, Cars, ShiftPoints) {
        $scope.allShiftPoints = {}
        ShiftPoints.all().then((shiftPoints) => {
            $scope.allShiftPoints = shiftPoints
        }).catch((err) => {
            console.error('err')
        })

        $scope.availableCars  = []
        Cars.all().then((cars) => {
            $scope.availableCars = cars
        }).catch((err) => {
            console.error(err)
        })

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
            ShiftPoints.save(config).then((shiftPoints) => {
                $scope.allShiftPoints = shiftPoints
            }).catch((err) => {
                console.error(err)
            })
        }
    }])
}
