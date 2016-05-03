(function (angular, _) {
    'use strict'

    const app = angular.module('irdRenault', [])

    app.controller('irdRenaultCtrl', ['$scope', function ($scope) {
        $scope.times = function(times) {
            return _.range(0, times)
        }
    }])

    app.directive('irdBoardsRenaultRevbar', ['$document', 'Helpers', 'Shifts', function($document, Helpers, Shifts) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                let revs, share, carId, gear

                scope.$watch('$last', function() {
                    revs = element.children().children()
                    share = 100 / revs.length
                })

                scope.$watch('ir.DriverInfo', function(n, o) {
                    if (!n || null == n || n < 1) {
                        return
                    }

                    carId = _.find(n.Drivers, function(o) {
                        return o.CarIdx == n.DriverCarIdx
                    }).CarID
                })

                scope.$watch('ir.Gear', function(n, o) {
                    gear = n
                })

                scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    let shift = Shifts.forCarAndGear(carId, gear) || scope.blink,
                        idle  = scope.idle,
                        rpm   = n

                    if (rpm >= shift) {
                        if (!element.hasClass('shift')) {
                            element.addClass('shift')
                            return
                        }
                    } else {
                        if (element.hasClass('shift')) {
                            element.removeClass('shift')
                        }
                    }

                    const percent = (rpm - idle) / (shift - idle) * 100
                    _.forEach(revs, function(rev, index) {
                        rev = angular.element(rev)
                        if (percent >= share * index) {
                            if (rev.css('display') != 'block') {
                                rev.css('display', 'block')
                            }
                        } else {
                            if (rev.css('display') != 'none') {
                                rev.css('display', 'none')
                            }
                        }
                    })
                })
            }
        }
    }])

})(angular, _)
