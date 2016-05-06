{
    const app = angular.module('ir.dashboards.formula_renault_20.directives', [])

    app.directive('irdBoardsRenaultRevbar', ['$document', 'Helpers', 'ShiftPoints', function($document, Helpers, ShiftPoints) {
        return {
            restrict: 'ACE',
            link: function($scope, $element, $attrs) {
                let revs, share

                $scope.$watch('$last', function() {
                    revs  = $element.children().children()
                    share = 100 / revs.length
                })

                $scope.$watchGroup(['ir.Gear', 'ir.RPM'], function(n, o) {
                    let [gear, rpm] = n
                    if (!gear || gear == null || !rpm || rpm == null || !$scope.blink || !$scope.idle) {
                        return
                    }

                    let shift = ShiftPoints.forCarAndGear($scope.carId, gear) || $scope.blink,
                        idle  = $scope.idle

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
