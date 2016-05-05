{
    const app = angular.module('ir.internal.shift_points.services', [])

    app.service('ShiftPoints', [function() {
        return new ShiftPoints()
    }])
}
