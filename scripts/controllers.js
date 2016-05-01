(function (angular) {
    'use strict'

    const app = angular.module('irdControllers', [])

    app.controller('irdCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.config = function($event, type) {
            if ($event.ctrlKey && 'Comma' == $event.code) {
                $location.path('/config')
            }
        }
    }])

    app.controller('irdBoardsCtrl', ['$scope', '$location', '$route', function($scope, $location, $route) {
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
        $scope.last    = 0
        $scope.idle    = 0
        $scope.drivers = 0

        $scope.$watch('ir.DriverInfo', function(n, o) {
            if (!n || null == n) {
                return
            }

            $scope.revs    = Helpers.numRevs(n.DriverCarRedLine)
            $scope.blink   = n.DriverCarSLBlinkRPM
            $scope.shift   = n.DriverCarSLShiftRPM
            $scope.last    = n.DriverCarSLLastRPM
            $scope.idle    = n.DriverCarIdleRPM
            $scope.max     = n.DriverCarRedLine
            $scope.drivers = n.Drivers.length
        })
    }])

    app.controller('irdAmgGt3Ctrl', ['$scope', function ($scope) {
    }])

    app.controller('irdRenaultCtrl', ['$scope', function ($scope) {
    }])
})(angular)
