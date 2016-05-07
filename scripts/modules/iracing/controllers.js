{
    const app = angular.module('ir.internal.iracing.controllers', [
    ])

    app.controller('iRacingCtrl', ['$scope', 'Kutu', 'iRacing', function($scope, Kutu, iRacing) {
        $scope.kutu = Kutu.all()

        $scope.save = function(config) {
            if (Kutu.save(config)) {
                $scope.kutu = Kutu.all()
                
                iRacing.server = Kutu.host
                iRacing.fps    = Kutu.fps
                iRacing.ibt    = Kutu.ibt

                iRacing.disconnect()
                iRacing.connect()
            }
        }
    }])
}
