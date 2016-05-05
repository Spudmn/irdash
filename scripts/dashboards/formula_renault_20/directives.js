{
    const app = angular.module('ir.dashboards.formula_renault_20.directives', [])

    app.directive('irdBoardsRenaultRevbar', ['$document', 'Helpers', 'ShiftPoints', function($document, Helpers, ShiftPoints) {
        return {
            restrict: 'AEC',
            link: function($scope, $element, $attrs) {
                let revs, share, carId, gear

                $scope.$watch('$last', function() {
                    revs  = $element.children().children()
                    share = 100 / revs.length
                })

                $scope.$watch('ir.DriverInfo', function(n, o) {
                    if (!n || null == n || n < 1) {
                        return
                    }

                    carId = _.find(n.Drivers, function(o) {
                        return o.CarIdx == n.DriverCarIdx
                    }).CarID
                })

                $scope.$watch('ir.Gear', function(n, o) {
                    gear = n
                })

                $scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null || !$scope.blink || !$scope.idle) {
                        return
                    }

                    let shift = ShiftPoints.forCarAndGear(carId, gear) || $scope.blink,
                        idle  = $scope.idle,
                        rpm   = n

                    if (rpm >= shift) {
                        if (!$element.hasClass('shift')) {
                            $element.addClass('shift')
                            return
                        }
                    } else {
                        if ($element.hasClass('shift')) {
                            $element.removeClass('shift')
                        }
                    }

                    const percent = (rpm - idle) / (shift - idle) * 100
                    _.forEach(revs, function(rev, index) {
                        let $element = angular.element(rev)
                        if (percent >= share * index) {
                            if ($element.css('display') != 'block') {
                                $element.css('display', 'block')
                            }
                        } else {
                            if ($element.css('display') != 'none') {
                                $element.css('display', 'none')
                            }
                        }
                    })
                })
            }
        }
    }])
}
