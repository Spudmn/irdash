{
    const app = angular.module('ir.internal.iracing.controllers', [
    ])

    app.controller('iRacingCtrl', ['$scope', 'Kutu', 'iRacing', function($scope, Kutu, iRacing) {
        $scope.kutu = Kutu.get()
        $scope.save = function(kutu) {
            Kutu.set(kutu)

            iRacing.server = Kutu.host
            iRacing.fps = Kutu.fps
            iRacing.ibt  = Kutu.ibt

            iRacing.disconnect()
            iRacing.connect()
        }
    }])
}
