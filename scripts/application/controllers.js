{
    const app = angular.module('ir.controllers', [])

    app.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.key = function($event) {
            if ($event.ctrlKey) {
                if ('Comma' == $event.code) {
                    $location.path('/config')
                }
            }
        }
    }])

    app.controller('BaseCtrl', ['$scope', 'iRacing', 'Helpers', function ($scope, iRacing, Helpers) {
        $scope.ir = iRacing.data

        $scope.revs    = []
        $scope.blink   = 0
        $scope.shift   = 0
        $scope.max     = 0
        $scope.red     = 0
        $scope.first   = 0
        $scope.last    = 0
        $scope.idle    = 0
        $scope.drivers = 0
        $scope.carId   = null

        $scope.$watch('ir.DriverInfo', function(n, o) {
            if (!n || null == n) {
                return
            }

            $scope.revs    = Helpers.numRevs(n.DriverCarRedLine)
            $scope.max     = Helpers.highestRev($scope.revs)
            $scope.blink   = n.DriverCarSLBlinkRPM
            $scope.shift   = n.DriverCarSLShiftRPM
            $scope.first   = n.DriverCarSLFirstRPM
            $scope.last    = n.DriverCarSLLastRPM
            $scope.idle    = n.DriverCarIdleRPM
            $scope.red     = n.DriverCarRedLine
            $scope.drivers = n.Drivers.length

            $scope.carId   = _.find(n.Drivers, function(o) {
                return o.CarIdx == n.DriverCarIdx
            }).CarID
        })
    }])
}
