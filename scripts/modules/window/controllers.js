{
    const app = angular.module('ir.internal.window.controllers', [
    ])

    app.controller('WindowCtrl', ['$scope', 'Config', 'Electron', function($scope, Config, Electron) {
        $scope.config = {}
        Config.all().then((data) => {
            $scope.config = data
        }).catch((err) => {
            console.error(err)
        })

        $scope.window = {}

        const win = Electron.remote.getCurrentWindow()

        $scope.window = {
            size: win.getSize(),
            position: win.getPosition()
        }

        win.on('resize', () => {
            $scope.window.size = win.getSize()
        })

        win.on('move', () => {
            $scope.window.position = win.getPosition()
        })

        $scope.save = function(config) {
            Config.save(config).then((data) => {
                $scope.config = data
            }).catch((err) => {
                console.error(err)
            })
        }
    }])
}
