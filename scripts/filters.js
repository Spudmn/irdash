(function(angular, lodash) {
    'use strict'

    const app = angular.module('irdFilters', [])

    app.filter('lapTime', ['Dashboard', function(Dashboard) {
        return function(time) {
            if (null == time || typeof time == 'undefined' || 0 >= time) {
                return '--'
            }

            let min = parseInt(time / 60),
                sec = parseInt(time) - min * 60,
                ms = parseInt(lodash.split(time.toFixed(min < 9 ? 3 : 2), '.')[1])

            return min + ':' + Dashboard.leftPad(sec, '00') + '.' + Dashboard.leftPad(ms, '000')
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
