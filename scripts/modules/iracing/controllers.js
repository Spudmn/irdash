{
    const app = angular.module('ir.internal.iracing.controllers', [
    ])

    app.controller('iRacingCtrl', ['$scope', 'Kutu', 'iRacing', function($scope, Kutu, iRacing) {
        $scope.connected = iRacing.connected
        $scope.running   = iRacing.running

        $scope.kutu = {}
        Kutu.all().then((kutu) => {
            $scope.kutu = kutu
        }).catch((err) => {
            console.error(err)
        })

        $scope.save = function(config) {
            Kutu.save(config).then((kutu) => {
                $scope.kutu = kutu
            }).catch((err) => {
                console.error(err)
            })
        }
    }])
}
