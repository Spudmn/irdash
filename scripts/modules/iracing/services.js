{
    const app = angular.module('ir.internal.iracing.services', [])

    app.service('Kutu', [function() {
        return new Kutu()
    }])
}
