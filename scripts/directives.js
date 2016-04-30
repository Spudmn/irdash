(function(angular) {
    'use strict'

    const app = angular.module('irdDirectives', [])

    app.directive('irdBack', ['$window', function($window) {
        return {
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    $window.history.back()
                })
            }
        }
    }])

    app.directive('irdFuelPressWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & FUEL_PRESSURE_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdWaterTempWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & WATER_TEMP_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdWaterTemp', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.WaterTemp', function(n, o) {
                    if (!n || n == null) {
                        element.text('-')
                        return
                    }

                    let temp = _.split(n.toFixed(1), '.')

                    element.html(temp[0] + '<sub>.</sub><sup>' + temp[1] + '</sup>')
                })
            }
        }
    })

    app.directive('irdOilPressWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & OIL_PRESSURE_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdOilTemp', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.OilTemp', function(n, o) {
                    if (!n || n == null) {
                        element.text('-')
                        return
                    }

                    let temp = _.split(n.toFixed(1), '.')

                    element.html(temp[0] + '<sub>.</sub><sup>' + temp[1] + '</sup>')
                })
            }
        }
    })

    app.directive('irdBrakeBias', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.dcBrakeBias', function(n, o) {
                    if (!n || n == null) {
                        element.text('-')
                        return
                    }

                    let bias = _.split(n.toFixed(1), '.')

                    element.html(bias[0] + '<sub>.</sub><sup>' + bias[1] + '</sup>')
                })
            }
        }
    })

    app.directive('irdVoltage', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.Voltage', function(n, o) {
                    if (!n || n == null) {
                        element.text('-')
                        return
                    }

                    let voltage = _.split(n.toFixed(1), '.')

                    element.html(voltage[0] + '<sub>.</sub><sup>' + voltage[1] + '</sup>')
                })
            }
        }
    })

    app.directive('irdTank', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-')
                        return
                    }

                    let tank = _.split(n.toFixed(1), '.')

                    element.html(tank[0] + '<sub>.</sub><sup>' + tank[1] + '</sup>')
                })
            }
        }
    })

    app.directive('irdFuel', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-')
                })
            }
        }
    })

    app.directive('irdPit', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-')
                })
            }
        }
    })

    app.directive('irdTake', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-')
                })
            }
        }
    })

    app.directive('irdLap', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watchGroup(['ir.SessionInfo', 'ir.Lap', 'ir.SessionNum'], function(n, o) {
                    let info = n[0], lap = n[1], num = n[2]
                    if (!info || info == null || !lap || lap == null || num == null) {
                        element.text('-')
                        return
                    }

                    let laps, sym = '/'

                    if (info.Sessions[num].SessionLaps == 'unlimited') {
                        element.html(lap) // laps = '&infin;'
                        return

                    }

                    if (info.Sessions[num].SessionLaps != 'unlimited') {
                        laps = info.Sessions[num].SessionLaps
                    }

                    // @todo (estimated) lap calculator
                    // use &asymp; almost equal symbol

                    element.html(lap + '<sub>' + sym + '</sub><sup>' + laps + '</sup>')
                })
            }
        }
    })

    app.directive('irdPos', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.PlayerCarPosition', function(n, o) {
                    if (!n || n == null) {
                        element.text('-')
                        return
                    }

                    element.html(n + '<sub>/</sub><sup>' + scope.drivers + '</sup>')
                })
            }
        }
    })

    app.directive('irdDelta', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.LapDeltaToBestLap', function(n, o) {
                    if (!n || n == null) {
                        element.html('--')
                        return
                    }

                    n = n.toFixed(3)

                    if (n < 0) {
                        element.html(n)
                        return
                    }

                    if (n > 0) {
                        element.html('+' + n)
                        return
                    }

                    element.html('&plusmn;' + n)
                })
            }
        }
    })

    app.directive('irdDeltaColor', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.LapDeltaToBestLap', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    // faster
                    if (n < 0) {
                        element.removeClass('fasslowerter')
                        element.addClass('faster')
                        return
                    }

                    // slower
                    if (n > 0) {
                        element.removeClass('faster')
                        element.addClass('slower')
                        return
                    }

                    // equal
                    element.removeClass('faster')
                    element.removeClass('slower')
                })
            }
        }
    })

    app.directive('irdRevbar', ['Dashboard', function(Dashboard) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null) {
                        return
                    }


                    let revs = scope.revs,
                        max  = scope.max,
                        rpm  = n

                    // max width
                    if (rpm >= max) {
                        element.css('width', '100%')
                        return
                    }

                    // in between
                    if (rpm) {
                        element.css('width', (rpm / max * 100) + '%')
                        return
                    }

                    // zero width
                    element.css('width', '0%')
                })

            }
        }
    }])

    app.directive('irdMarkers', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'views/marker.html'
        }
    }])

    app.directive('irdRevPit', ['Dashboard', function(Dashboard) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & PIT_SPEED_LIMITER) {
                        if (element.css('display') != 'block') {
                            element.css('display', 'block')
                            element.addClass('blink')
                        }

                        return
                    }

                    if (element.css('display') != 'none') {
                        element.removeClass('blink')
                        element.css('display', 'none')
                    }
                })
            }
        }
    }])

    app.directive('irdRevShift', ['Dashboard', function(Dashboard) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    let blink = scope.blink,
                        rpm = n

                    if (rpm >= blink) {
                        if (element.css('display') != 'block') {
                            element.css('display', 'block')
                        }
                    } else {
                        if (element.css('display') != 'none') {
                            element.css('display', 'none')
                        }
                    }
                })
            }
        }
    }])
})(angular)
