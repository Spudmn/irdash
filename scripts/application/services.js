{
    const app = angular.module('ir.services', [])

    app.service('Cars', [function() {
        return new window.Cars()
    }])

    app.service('iRacing', ['Kutu', function(Kutu) {
        let params = ['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__']
        let once = [] // @todo collect these from dashboards & services/providers

        return new iRacing(Kutu.host, params, once, Kutu.fps, Kutu.ibt)
    }])

    app.service('Helpers', [function() {
        return new window.Helpers()
    }])
}
