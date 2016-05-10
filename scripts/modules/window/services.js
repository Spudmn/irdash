{
    const app = angular.module('ir.internal.window.services', [])

    app.service('Config', ['$http', function($http) {
        return {
            all: function() {
                return $http.get('/api/config').then((res) => {
                    return res.data
                })
            },
            save: function(config) {
                return $http.post('/api/config', config).then((res) => {
                    return res.data
                })
            }
        }
    }])
}
