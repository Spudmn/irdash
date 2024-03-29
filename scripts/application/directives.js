{
    const app = angular.module('ir.directives', [])

    app.directive('irdBack', ['$window', function($window) {
        return {
            link: function($scope, $element, $attrs) {
                $element.on('click', function() {
                    $window.history.back()
                })
            }
        }
    }])

    app.directive('irdRevPit', ['Helpers', 'EngineWarnings', function(Helpers, EngineWarnings) {
        return {
            restrict: 'ACE',
            link: function($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function(n, o) {
                    if (n & EngineWarnings.PIT_SPEED_LIMITER) {
                        if ($element.css('display') != 'block') {
                            $element.css('display', 'block')
                        }

                        return
                    }

                    if ($element.css('display') != 'none') {
                        $element.css('display', 'none')
                    }
                })
            }
        }
    }])
}
