{
    const app = angular.module('ir.internal.window.controllers', [
    ])

    app.controller('WindowCtrl', ['$scope', 'Config', function($scope, Config) {
        $scope.config = Config.get()
        $scope.window = Config.win()

        $scope.save = function(config) {
            Config.set(config)
        }
    }])
}
