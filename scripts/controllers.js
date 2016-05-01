(function (angular, lodash) {
    'use strict'

    const app = angular.module('irdControllers', [])

    app.controller('irdCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.config = function($event, type) {
            if ($event.ctrlKey && 'Comma' == $event.code) {
                $location.path('/config')
            }
        }
    }])

    app.controller('irdBoardsCtrl', ['$scope', function($scope) {
    }])

    app.controller('irdShiftsCtrl', ['$scope', 'Cars', 'Shifts', function($scope, Cars, Shifts) {
        const gears = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}

        $scope.cars = Cars.get()
        $scope.shifts = Shifts.get()

        $scope.car = null
        $scope.gears = gears

        $scope.$watch('car', function(n, o) {
            if (!n) {
                return
            }

            if (!$scope.shifts.hasOwnProperty(n)) {
                $scope.gears = gears
                return
            }

            $scope.gears = $scope.shifts[n]
        })

        $scope.$watch('gears', function(n, o) {
            console.log(JSON.stringify(n))
        }, true)

        $scope.save = function(shifts) {
            // $scope.shifts = Shifts.set(shifts)
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

        $scope.$watch('ir.DriverInfo', function(n, o) {
            if (!n || null == n) {
                return
            }

            $scope.revs    = Helpers.numRevs(n.DriverCarRedLine)
            $scope.max     = (lodash.last($scope.revs)+1) * 1000
            $scope.blink   = n.DriverCarSLBlinkRPM
            $scope.shift   = n.DriverCarSLShiftRPM
            $scope.first   = n.DriverCarSLFirstRPM
            $scope.last    = n.DriverCarSLLastRPM
            $scope.idle    = n.DriverCarIdleRPM
            $scope.red     = n.DriverCarRedLine
            $scope.drivers = n.Drivers.length
        })
    }])

    app.controller('irdAmgGt3Ctrl', ['$scope', function ($scope) {
    }])

    app.controller('irdRenaultCtrl', ['$scope', function ($scope) {
    }])
})(angular, _)
