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

        $scope.revs = [4, 5, 6, 7, 8, 9]
        $scope.blink = 8750
        $scope.base = 4000
        $scope.max  = 9000
        $scope.drivers = 32
        $scope.ir.PlayerCarPosition = 1
        $scope.ir.FuelLevel = 57.8
        $scope.ir.Gear = 4
        $scope.ir.Speed = 23.5
        $scope.ir.dcABS = 4
        $scope.ir.dcThrottleShape = 10
        $scope.ir.dcTractionControl = 8
        $scope.ir.WaterTemp = 89.9
        $scope.ir.OilPress = 7
        $scope.ir.OilTemp = 89.9
        $scope.ir.dcBrakeBias = 49.8
        $scope.ir.Voltage = 13.9
        $scope.ir.Lap = 3
        $scope.ir.LapLastLapTime = 236.3772
        $scope.ir.LapBestLapTime = 238.8743
        $scope.ir.SessionNum = 1
        $scope.ir.SessionInfo = {
            Sessions: {
                1: { SessionLaps: 7 }
            }
        }

        $scope.ir.RPM = 7450
        $scope.ir.LapDeltaToBestLap = -2.399

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
