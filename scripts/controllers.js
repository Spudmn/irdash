(function (angular, undefined) {
    'use strict'

    const app = angular.module('irdControllers', [])

    app.controller('irdCtrl', ['$scope', 'iRacing', 'Dashboard', function ($scope, iRacing, Dashboard) {
        $scope.ir = iRacing.data

        $scope.revs    = []
        $scope.blink   = 0
        $scope.base    = 0
        $scope.max     = 0
        $scope.drivers = 0

        $scope.$watch('ir.DriverInfo', function(n, o) {
            if (!n || null == n) {
                return
            }

            $scope.revs    = Dashboard.numRevs(n.DriverCarRedLine)
            $scope.blink   = n.DriverCarSLBlinkRPM
            $scope.base    = $scope.revs[0] * 1000
            $scope.max     = n.DriverCarRedLine
            $scope.drivers = n.Drivers.length
        })
    }])
})(angular)
