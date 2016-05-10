{
    const app = angular.module('ir.internal.dashboards.providers', [])

    app.provider('Dashboards', [function() {
        let dashboards = []

        this.add = function(id, name, carId) {
            console.log(dashboards)
            dashboards.push({
                id: id,
                name: name,
                carId: carId
            })
        }

        this.$get = function() {
            return {
                all: function() {
                    return dashboards
                }
            }
        }
    }])
}
