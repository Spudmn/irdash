{
    const app = angular.module('ir.services', [])

    app.service('Cars', [function() {
        return new window.Cars()
    }])

    app.service('iRacing', ['$rootScope', 'Kutu', function($rootScope, Kutu) {
        let params = ['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__']
        let once = [] // @todo collect these from dashboards & services/providers

        const ir = new iRacing(Kutu.host, params, once, Kutu.fps, Kutu.ibt)

        ir.on('open', () => {
            $rootScope.opened = true
            $rootScope.$apply()
        })
        ir.on('close', () => {
            $rootScope.opened = false
            $rootScope.$apply()
        })
        ir.on('start', () => {
            $rootScope.started = true
            $rootScope.$apply()
        })
        ir.on('stop', () => {
            $rootScope.started = false
            $rootScope.$apply()
        })
        ir.on('error', (err) => {
            $rootScope.$apply()
        })
        ir.on('update', (keys) => {
            $rootScope.$apply()
        })

        return ir
    }])

    app.service('Helpers', [function() {
        return new window.Helpers()
    }])
}
