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

        setTimeout(function() {
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
            $scope.ir.EngineWarnings =
                WATER_TEMP_WARNING |
                FUEL_PRESSURE_WARNING |
                OIL_PRESSURE_WARNING

            $scope.ir.RPM = 8900
            $scope.ir.LapDeltaToBestLap = -2.399
            $scope.ir.DriverInfo = {
                DriverCarRedLine: 9000,
                DriverCarSLBlinkRPM: 8800,
                Drivers: []
            }
        }, 500);

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
