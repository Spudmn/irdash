(function(window, angular, lodash) {
    'use strict'

    const app = angular.module('irdServices', [])

    app.service('Config', [function() {
        return new window.Config()
    }])

    app.service('Cars', [function() {
        return new window.Cars()
    }])

    app.service('Shifts', [function() {
        return new window.Shifts()
    }])

    app.service('iRacing', ['$rootScope', 'Helpers', function($rootScope, Helpers) {
        const ir = new window.IRacing(['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__'], [], 30)

        ir.onWSConnect = function() {
            $rootScope.wsConnected = true

            return $rootScope.$apply()
        }
        ir.onWSDisconnect = function() {
            $rootScope.wsConnected = false

            return $rootScope.$apply()
        }

        ir.onConnect = function() {
            $rootScope.connected = true

            return $rootScope.$apply()
        }

        ir.onDisconnect = function() {
            $rootScope.connected = false

            return $rootScope.$apply()
        }

        ir.onUpdate = function(keys) {
            if (keys.indexOf('DriverInfo') >= 0) {}

            if (keys.indexOf('SessionInfo') >= 0) {}

            if (keys.indexOf('WeekendInfo') >= 0) {}

            return $rootScope.$apply()
        }

        return ir
    }])

    app.service('Helpers', [function() {
        return new window.Helpers()
    }])
})(window, angular, _)
