{
    const app = angular.module('ir.dashboards.mercedes_amg_gt3.directives', [])

    app.directive('irdBoardsAmgGt3FuelPressWarn', ['EngineWarnings', function(EngineWarnings) {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.FUEL_PRESSURE_WARNING) {
                        $element.addClass('warning')
                    } else {
                        $element.removeClass('warning')
                    }
                })
            }
        }
    }])

    app.directive('irdBoardsAmgGt3WaterTempWarn', ['EngineWarnings', function(EngineWarnings) {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.WATER_TEMP_WARNING) {
                        $element.addClass('warning')
                    } else {
                        $element.removeClass('warning')
                    }
                })
            }
        }
    }])

    app.directive('irdBoardsAmgGt3WaterTemp', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.WaterTemp', function(n, o) {
                    if (!n || n == null) {
                        $element.text('-')
                        return
                    }

                    let [temperature, fracture] = _.split(n.toFixed(1), '.')

                    // @todo refactor into template / sub-directive
                    $element.html(`${temperature}<sub>.</sub><sup>${fracture}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3OilPressWarn', ['EngineWarnings', function(EngineWarnings) {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.OIL_PRESSURE_WARNING) {
                        $element.addClass('warning')
                    } else {
                        $element.removeClass('warning')
                    }
                })
            }
        }
    }])

    app.directive('irdBoardsAmgGt3OilTemp', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.OilTemp', function(n, o) {
                    if (!n || n == null) {
                        $element.text('-')
                        return
                    }

                    let [temperature, fracture] = _.split(n.toFixed(1), '.')

                    // @todo refactor into template / sub-directive
                    $element.html(`${temperature}<sub>.</sub><sup>${fracture}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3BrakeBias', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.dcBrakeBias', function(n, o) {
                    if (!n || n == null) {
                        $element.text('-')
                        return
                    }

                    let [bias, fracture] = _.split(n.toFixed(1), '.')

                    // @todo refactor into template / sub-directive
                    $element.html(`${bias}<sub>.</sub><sup>${fracture}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Voltage', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.Voltage', function(n, o) {
                    if (!n || n == null) {
                        $element.text('-')
                        return
                    }

                    let [voltage, fracture] = _.split(n.toFixed(1), '.')

                    // @todo refactor into template / sub-directive
                    $element.html(`${voltage}<sub>.</sub><sup>${fracture}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Tank', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-')
                        return
                    }

                    let [tank, fracture] = _.split(n.toFixed(1), '.')

                    // @todo refactor into template / sub-directive
                    $element.html(`${tank}<sub>.</sub><sup>${fracture}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Fuel', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-')
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Pit', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-')
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Take', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function(n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-')
                        return
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-')
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Lap', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watchGroup(['ir.SessionInfo', 'ir.Lap', 'ir.SessionNum'], function(n, o) {
                    let [info, lap, num] = n
                    if (!info || info == null || !lap || lap == null || num == null) {
                        $element.text('-')
                        return
                    }

                    let symbol = '/',
                        laps

                    if (info.Sessions[num].SessionLaps == 'unlimited') {
                        $element.html(lap) // laps = '&infin;'
                        return

                    }

                    if (info.Sessions[num].SessionLaps != 'unlimited') {
                        laps = info.Sessions[num].SessionLaps
                    }

                    // @todo (estimated) lap calculator
                    // use &asymp; almost equal symbol

                    // @todo refactor into template / sub-directive
                    $element.html(`${lap}<sub>${symbol}</sub><sup>${laps}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Pos', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.PlayerCarPosition', function(n, o) {
                    if (!n || n == null) {
                        $element.text('-')
                        return
                    }

                    // @todo refactor into template / sub-directive
                    $element.html(`${n}<sub>/</sub><sup>${$scope.drivers}</sup>`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3Delta', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.LapDeltaToBestLap', function(n, o) {
                    if (!n || n == null) {
                        $element.html('--')
                        return
                    }

                    n = n.toFixed(3)

                    if (n < 0) {
                        $element.html(n)
                        return
                    }

                    if (n > 0) {
                        $element.html(`+${n}`)
                        return
                    }

                    $element.html(`&plusmn;${n}`)
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3DeltaColor', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.LapDeltaToBestLap', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    // faster
                    if (n < 0) {
                        $element.removeClass('fasslowerter')
                        $element.addClass('faster')
                        return
                    }

                    // slower
                    if (n > 0) {
                        $element.removeClass('faster')
                        $element.addClass('slower')
                        return
                    }

                    // equal
                    $element.removeClass('faster')
                    $element.removeClass('slower')
                })
            }
        }
    })

    app.directive('irdBoardsAmgGt3RevShift', ['Helpers', 'ShiftPoints', function(Helpers, ShiftPoints) {
        return {
            restrict: 'ACE',
            link: function($scope, $element, $attrs) {
                $scope.$watchGroup(['ir.Gear', 'ir.RPM'], function(n, o) {
                    let [gear, rpm] = n
                    if (!gear || gear == null || !rpm || rpm == null) {
                        return
                    }

                    let shift = ShiftPoints.forCarAndGear($scope.carId, gear) || $scope.blink

                    if (rpm >= shift) {
                        if ($element.css('display') != 'block') {
                            $element.css('display', 'block')
                        }
                    } else {
                        if ($element.css('display') != 'none') {
                            $element.css('display', 'none')
                        }
                    }
                })
            }
        }
    }])

    app.directive('irdBoardsAmgGt3RevbarAmgGt3', ['Helpers', function(Helpers) {
        return {
            restrict: 'ACE',
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.RPM', function(n, o) {
                    if (!n || n == null) {
                        return
                    }

                    let max = $scope.max,
                        rpm = n

                    // max width
                    if (rpm >= max) {
                        $element.css('width', '100%')
                        return
                    }

                    // in between
                    if (rpm > 0) {
                        $element.css('width', (rpm / max * 100) + '%')
                        return
                    }

                    // zero width
                    $element.css('width', '0%')
                })

            }
        }
    }])
}
