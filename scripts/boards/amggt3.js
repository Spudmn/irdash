(function (angular, _) {
    'use strict'

    const app = angular.module('irdAmgGt3', [])


    app.controller('irdAmgGt3Ctrl', ['$scope', function ($scope) {
    }])


    app.directive('irdBoardsAmgGt3FuelPressWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.FUEL_PRESSURE_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3WaterTempWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.WATER_TEMP_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3WaterTemp', function() {
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

    app.directive('irdBoardsAmgGt3OilPressWarn', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.OIL_PRESSURE_WARNING) {
                        element.addClass('warning')
                    } else {
                        element.removeClass('warning')
                    }
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3OilTemp', function() {
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

    app.directive('irdBoardsAmgGt3BrakeBias', function() {
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

    app.directive('irdBoardsAmgGt3Voltage', function() {
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

    app.directive('irdBoardsAmgGt3Tank', function() {
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

    app.directive('irdBoardsAmgGt3Fuel', function() {
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

    app.directive('irdBoardsAmgGt3Pit', function() {
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

    app.directive('irdBoardsAmgGt3Take', function() {
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

    app.directive('irdBoardsAmgGt3Lap', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watchGroup(['ir.SessionInfo', 'ir.Lap', 'ir.SessionNum'], function(n, o) {
                    let info = n[0],
                        lap = n[1],
                        num = n[2]
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

    app.directive('irdBoardsAmgGt3Pos', function() {
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

    app.directive('irdBoardsAmgGt3Delta', function() {
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

    app.directive('irdBoardsAmgGt3DeltaColor', function() {
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

    app.directive('irdBoardsAmgGt3RevShift', ['Helpers', 'Shifts', function(Helpers, Shifts) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                let gear, carId

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
                        rpm   = n

                    if (rpm >= shift) {
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

    app.directive('irdBoardsAmgGt3RevbarAmgGt3', ['Helpers', 'Shifts', function(Helpers, Shifts) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    let max = scope.max,
                        rpm = n

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
})(angular, _)
