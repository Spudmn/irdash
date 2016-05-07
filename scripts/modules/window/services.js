{
    const app = angular.module('ir.internal.window.services', [])

    app.service('Config', [function() {
        return new Config()
    }])
}
