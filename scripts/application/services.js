{
    const app = angular.module('ir.services', ['ngWebSocket'])

    app.service('Electron', [function() {
        return require('electron')
    }])

    app.factory('Cars', ['$http', function($http) {
        return {
            all: function() {
                return $http.get('/api/cars').then((res) => {
                    return res.data
                })
            }
        }
    }])

    app.factory('iRacing', ['$rootScope', '$websocket', 'Kutu', function($rootScope, $websocket, Kutu) {
        let params = ['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__']
        let once = [] // @todo collect these from dashboards & services/providers

        let connected = false,
            running = false,
            firstTime = true,
            reconnect = null

        const ws = $websocket('ws://localhost:3000')
        const ir = {
            set connected(is) {
                connected = true
                $rootScope.$apply()
            },
            get connected() {
                return connected
            },
            set running(is) {
                running = is
                $rootScope.$apply()
            },
            get running() {
                return running
            },
            set firstTime(is) {
                firstTime = is
                $rootScope.$apply()
            },
            get firstTime() {
                return firstTime
            },
            data: {}
        }

        ws.onError((err) => {
            console.error('ws:error', err)
        })

        ws.onOpen(() => {
            console.log('ws:open')
            ir.connected = true

            _.forIn(ir.data, (value, key) => {
                ir.data[key] = null
                delete ir.data[key]
            })
        })

        ws.onClose(() => {
            console.log('ws:close')
            ir.connected = false
            ir.running = false

            _.forIn(data, (value, key) => {
                ir.data[key] = null
                delete ir.data[key]
            })
        })

        ws.onMessage((event) => {
            let data = JSON.parse(event.data.replace(/\bNaN\b/g, 'null'))

            if (data.disconnected) {
                ir.running = false
            }

            if (data.connected || (firstTime && !connected)) {
                firstTime = false
                ir.running = true

                _.forIn(data, (value, key) => {
                    ir.data[key] = null
                    delete ir.data[key]
                })
            }

            _.forIn(data.data, (value, key) => {
                ir.data[key] = value
            })
        })

        return ir
    }])

    app.service('Helpers', [function() {
        this.formatLapTime = function(time) {
            if (null == time || 0 >= time) {
                return '--'
            }

            let min = parseInt(time / 60),
                sec = parseInt(time) - min * 60,
                ms = parseInt(_.split(time.toFixed(min < 10 ? 3 : 2), '.')[1])

            return min + ':' + this.leftPad(sec, 2) + '.' + this.leftPad(ms, 3)
        }

        this.leftPad = function(str, pad) {
            return _.padStart(str, pad, 0)
        }

        this.numRevs = function(redLine) {
            return _.range(0, _.ceil(redLine / 1000))
        }

        this.highestRev = function(revs) {
            return (_.last(revs) + 1) * 1000
        }
    }])
}
