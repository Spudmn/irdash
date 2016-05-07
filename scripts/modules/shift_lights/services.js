{
    const app = angular.module('ir.internal.shift_lights.services', [])

    app.service('ShiftLights', [function() {
        return new ShiftLights()
    }])
}
