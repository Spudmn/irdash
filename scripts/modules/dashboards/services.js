{
    const app = angular.module('ir.internal.dashboards.services', [])

    app.service('Boards', [function() {
        return new window.Boards()
    }])
}
