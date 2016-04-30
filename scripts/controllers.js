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

    app.controller('irdConfigCtrl', ['$scope', 'Config', function($scope, Config) {
        $scope.config = Config.get()
        $scope.save = function(config) {
            $scope.config = Config.set(config)
        }
    }])

    app.controller('irdAmgGt3Ctrl', ['$scope', 'iRacing', 'Dashboard', function ($scope, iRacing, Dashboard) {
        $scope.ir = iRacing.data

        $scope.revs    = []
        $scope.blink   = 0
        $scope.max     = 0
        $scope.drivers = 0

        $scope.$watch('ir.DriverInfo', function(n, o) {
            if (!n || null == n) {
                return
            }

            $scope.revs    = Dashboard.numRevs(n.DriverCarRedLine)
            $scope.blink   = n.DriverCarSLBlinkRPM
            $scope.max     = n.DriverCarRedLine
            $scope.drivers = n.Drivers.length
        })
    }])
})(angular)
