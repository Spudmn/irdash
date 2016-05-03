(function(angular, lodash) {
    'use strict'

    const app = angular.module('irdFilters', [])

    app.filter('lapTime', ['Helpers', function(Helpers) {
        return function(time) {
            return Helpers.formatLapTime(time)
        }
    }])

    app.filter('fixed', [function() {
        return function(number, fraction) {
            if (null == number || typeof number == 'undefined') {
                return '-'
            }

            return number.toFixed(fraction || 0)
        }
    }])

    app.filter('speed', [function() {
        return function(speed) {
            if (null == speed || typeof speed == 'undefined') {
                return '-'
            }

            return (speed * 3.6).toFixed(0)
        }
    }])

    app.filter('gear', [function() {
        return function(gear) {
            if (null == gear || typeof gear == 'undefined') {
                return '-'
            }

            if (gear == 0) {
                return 'N'
            }

            if (gear == -1) {
                return 'R'
            }

            return gear
        }
    }])
})(angular, _)
