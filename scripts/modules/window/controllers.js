{
    const app = angular.module('ir.internal.window.controllers', [
    ])

    app.controller('WindowCtrl', ['$scope', 'Config', function($scope, Config) {
        $scope.config = Config.all()
        $scope.window = Config.window()

        $scope.save = function(config) {
            Config.save(config)
        }
    }])
}
