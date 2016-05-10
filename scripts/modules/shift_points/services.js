{
    const app = angular.module('ir.internal.shift_points.services', [])

    app.factory('ShiftPoints', ['$http', function($http) {
        return {
            all: function() {
                console.log('shift-points:get')
                return $http.get('/api/shift-points').then((res) => {
                    return res.data
                })
            },
            save: function(shiftPoints) {
                console.log('shift-points:set')
                return $http.post('/api/shift-points', shiftPoints).then((res) => {
                    return res.data
                })
            }
        }
    }])
}
