(function(angular, lodash, IRacing, undefined) {
    'use strict'

    const app = angular.module('irdServices', [])

    app.service('iRacing', ['$rootScope', 'Dashboard', function($rootScope, Dashboard) {
        const ir = new IRacing(['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__'], [], 60)

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
            if (keys.indexOf('DriverInfo') >= 0) {
            }

            if (keys.indexOf('SessionInfo') >= 0) {
            }

            if (keys.indexOf('WeekendInfo') >= 0) {
            }

            return $rootScope.$apply()
        }

        return ir
    }])

    app.service('Dashboard', [function() {
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
                let maxRev = this.parseThousands(redLine),
                    tryExact = parseInt(maxRev + '000')

                if (tryExact != redLine) {
                    let tryNext = tryExact + 1000
                    if (tryNext > redLine) {
                        maxRev = this.parseThousands(tryNext)
                    }
                }

                return lodash.range(maxRev - 5, maxRev)
            },

            parseThousands: function(rev) {
                rev = rev.toString()

                return rev.length == 5
                    ? parseInt(rev[0] + rev[1])
                    : parseInt(rev[0])
            }
        }
    }])
})(angular, _, window.IRacing)
