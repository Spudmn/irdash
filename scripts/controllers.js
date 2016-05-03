(function (angular, lodash) {
    'use strict'

    const app = angular.module('irdControllers', [])

    app.controller('irdCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.config = function($event) {
            if ($event.ctrlKey) {
                if ('Comma' == $event.code) {
                    $location.path('/config')
                }
                if ('KeyB' == $event.code) {
                    $location.path('/boards')
                }
                if ('KeyS' == $event.code) {
                    $location.path('/shifts')
                }
            }
        }
    }])

    app.controller('irdBoardsCtrl', ['$scope', function($scope) {
    }])

    app.controller('irdShiftsCtrl', ['$scope', 'Cars', 'Shifts', function($scope, Cars, Shifts) {
        $scope.cars   = Cars.get()
        $scope.shifts = Shifts.get()

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
            if (!n || !lodash.keys(n).length || !lodash.sum(lodash.values(n))) {
                delete $scope.shifts[$scope.carId]
                return
            }

            $scope.shifts[$scope.carId] = n;
        }, true)

        $scope.save = function(shifts) {
            $scope.shifts = Shifts.set(shifts)
        }
    }])

    app.controller('irdConfigCtrl', ['$scope', 'Config', function($scope, Config) {
        $scope.config = Config.get()
        $scope.window = Config.win()
        $scope.save = function(config) {
            $scope.config = Config.set(config)
        }
    }])

    app.controller('irdBaseCtrl', ['$scope', 'iRacing', 'Helpers', function ($scope, iRacing, Helpers) {
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

        setTimeout(function() {
            $scope.max   = 9000
            $scope.red   = 9000
            $scope.idle  = 2300

            $scope.ir.RPM   = 5003
            $scope.ir.Gear  = 4
            $scope.ir.Speed = 37.8

            $scope.ir.DriverInfo = {
                DriverCarRedLine: 9000,
                DriverCarIdx: 1,
                Drivers: [{
                    CarIdx: 1,
                    CarID: 72
                }]
            }
        }, 500)

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
        })
    }])
})(angular, _)
