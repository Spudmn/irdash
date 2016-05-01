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
        return {
            formatLapTime: function(time) {
                if (null == time || 0 >= time) {
                    return '--'
                }

                let min = parseInt(time / 60),
                    sec = parseInt(time) - min * 60,
                    ms = parseInt(lodash.split(time.toFixed(min < 10 ? 3 : 2), '.')[1])

                return min + ':' + this.leftPad(sec, '00') + '.' + this.leftPad(ms, '000')
            },

            leftPad: function(str, pad) {
                str = str.toString()

                return pad.substring(0, pad.length - str.length) + str
            },

            numRevs: function(redLine) {
                return lodash.range(0, this.highestRev(redLine))
            },

            highestRev: function(rev) {
                return Math.ceil(rev / 1000).toFixed(0)
            }
        }
    }])
})(window, angular, _)
