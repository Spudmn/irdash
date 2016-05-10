{
    const app = angular.module('ir.internal.iracing.services', [])

    app.service('Kutu', ['$http', function($http) {
        return {
            all: function() {
                return $http.get('/api/kutu').then((res) => {
                    return res.data
                })
            },
            save: function(kutu) {
                return $http.post('/api/kutu', kutu).then((res) => {
                    return res.data
                })
            }
        }
    }])
}
