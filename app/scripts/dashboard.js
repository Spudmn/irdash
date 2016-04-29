'use strict';

(function (angular) {
    'use strict';

    var app = angular.module('irdApp', [
    // angular
    'ngRoute',

    // irdash
    'irdControllers', 'irdDirectives', 'irdServices', 'irdFilters']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'views/config.html',
            controller: 'irdConfigCtrl'
        }).when('/', {
            templateUrl: 'views/amggt3.html',
            controller: 'irdAmgGt3Ctrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
})(angular);
"use strict";

/*
 * EngineWarnings
 */
var WATER_TEMP_WARNING = 0x01;
var FUEL_PRESSURE_WARNING = 0x02;
var OIL_PRESSURE_WARNING = 0x04;
var ENGINE_STALLED = 0x08;
var PIT_SPEED_LIMITER = 0x10;
var REV_LIMITER_ACTIVE = 0x20;

/*
 * Flags
 */

// global flags
var CHECKERED = 0x0001;
var WHITE = 0x0002;
var GREEN = 0x0004;
var YELLOW = 0x0008;
var RED = 0x0010;
var BLUE = 0x0020;
var DEBRIS = 0x0040;
var CROSSED = 0x0080;
var YELLOW_WAVING = 0x0100;
var ONE_LAP_TO_GREEN = 0x0200;
var GREEN_HELD = 0x0400;
var TEN_TO_GO = 0x0800;
var FIVE_TO_GO = 0x1000;
var RANDOM_WAVING = 0x2000;
var CAUTION = 0x4000;
var CAUTION_WAVING = 0x8000;

// drivers black flags
var BLACK = 0x010000;
var DISQUALIFY = 0x020000;
var SERVICIBLE = 0x040000; // car is allowed service (not a flag)
var FURLED = 0x080000;
var REPAIR = 0x100000;

// start lights
var START_HIDDEN = 0x10000000;
var START_READY = 0x20000000;
var START_SET = 0x40000000;
var START_GO = 0x80000000;

/*
 * TrackLocation
 */
var NOT_IN_WORLD = -1;
var OFF_TRACK = 0;
var IN_PIT_STALL = 1;
var APROACHING_PITS = 2;
var ON_TRACK = 3;

/*
 * SessionStates
 */
var SESSION_STATE_INVALID = 0;
var SESSION_STATE_GET_IN_CAR = 1;
var SESSION_STATE_WARMUP = 2;
var SESSION_STATE_PARADE_LAPS = 3;
var SESSION_STATE_RACING = 4;
var SESSION_STATE_CHECKERED = 5;
var SESSION_STATE_COOL_DOWN = 6;
'use strict';

(function (angular) {
    'use strict';

    var app = angular.module('irdControllers', []);

    app.controller('irdCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.config = function ($event, type) {
            if ($event.ctrlKey && 'Comma' == $event.code) {
                $location.path('/config');
            }
        };
    }]);

    app.controller('irdConfigCtrl', ['$scope', 'Config', function ($scope, Config) {
        $scope.config = Config.get();
        $scope.save = function (config) {
            $scope.config = Config.set(config);
        };
    }]);

    app.controller('irdAmgGt3Ctrl', ['$scope', 'iRacing', 'Dashboard', function ($scope, iRacing, Dashboard) {
        $scope.ir = iRacing.data;

        $scope.revs = [];
        $scope.blink = 0;
        $scope.max = 0;
        $scope.drivers = 0;

        setTimeout(function () {
            $scope.ir.PlayerCarPosition = 1;
            $scope.ir.FuelLevel = 57.8;
            $scope.ir.Gear = 4;
            $scope.ir.Speed = 23.5;
            $scope.ir.dcABS = 4;
            $scope.ir.dcThrottleShape = 10;
            $scope.ir.dcTractionControl = 8;
            $scope.ir.WaterTemp = 89.9;
            $scope.ir.OilPress = 7;
            $scope.ir.OilTemp = 89.9;
            $scope.ir.dcBrakeBias = 49.8;
            $scope.ir.Voltage = 13.9;
            $scope.ir.Lap = 3;
            $scope.ir.LapLastLapTime = 236.3772;
            $scope.ir.LapBestLapTime = 238.8743;
            $scope.ir.SessionNum = 1;
            $scope.ir.SessionInfo = {
                Sessions: {
                    1: { SessionLaps: 7 }
                }
            };
            $scope.ir.EngineWarnings = WATER_TEMP_WARNING | FUEL_PRESSURE_WARNING | OIL_PRESSURE_WARNING;

            $scope.ir.RPM = 8900;
            $scope.ir.LapDeltaToBestLap = -2.399;
            $scope.ir.DriverInfo = {
                DriverCarRedLine: 9000,
                DriverCarSLBlinkRPM: 8800,
                Drivers: []
            };
        }, 500);

        $scope.$watch('ir.DriverInfo', function (n, o) {
            if (!n || null == n) {
                return;
            }

            $scope.revs = Dashboard.numRevs(n.DriverCarRedLine);
            $scope.blink = n.DriverCarSLBlinkRPM;
            $scope.max = n.DriverCarRedLine;
            $scope.drivers = n.Drivers.length;
        });
    }]);
})(angular);
'use strict';

(function (angular) {
    'use strict';

    var app = angular.module('irdDirectives', []);

    app.directive('irdBack', ['$window', function ($window) {
        return {
            link: function link(scope, element, attrs) {
                element.on('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);

    app.directive('irdFuelPressWarn', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & FUEL_PRESSURE_WARNING) {
                        element.addClass('warning');
                    } else {
                        element.removeClass('warning');
                    }
                });
            }
        };
    });

    app.directive('irdWaterTempWarn', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & WATER_TEMP_WARNING) {
                        element.addClass('warning');
                    } else {
                        element.removeClass('warning');
                    }
                });
            }
        };
    });

    app.directive('irdWaterTemp', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.WaterTemp', function (n, o) {
                    if (!n || n == null) {
                        element.text('-');
                        return;
                    }

                    var temp = _.split(n.toFixed(1), '.');

                    element.html(temp[0] + '<sub>.</sub><sup>' + temp[1] + '</sup>');
                });
            }
        };
    });

    app.directive('irdOilPressWarn', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & OIL_PRESSURE_WARNING) {
                        element.addClass('warning');
                    } else {
                        element.removeClass('warning');
                    }
                });
            }
        };
    });

    app.directive('irdOilTemp', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.OilTemp', function (n, o) {
                    if (!n || n == null) {
                        element.text('-');
                        return;
                    }

                    var temp = _.split(n.toFixed(1), '.');

                    element.html(temp[0] + '<sub>.</sub><sup>' + temp[1] + '</sup>');
                });
            }
        };
    });

    app.directive('irdBrakeBias', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.dcBrakeBias', function (n, o) {
                    if (!n || n == null) {
                        element.text('-');
                        return;
                    }

                    var bias = _.split(n.toFixed(1), '.');

                    element.html(bias[0] + '<sub>.</sub><sup>' + bias[1] + '</sup>');
                });
            }
        };
    });

    app.directive('irdVoltage', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.Voltage', function (n, o) {
                    if (!n || n == null) {
                        element.text('-');
                        return;
                    }

                    var voltage = _.split(n.toFixed(1), '.');

                    element.html(voltage[0] + '<sub>.</sub><sup>' + voltage[1] + '</sup>');
                });
            }
        };
    });

    app.directive('irdTank', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-');
                        return;
                    }

                    var tank = _.split(n.toFixed(1), '.');

                    element.html(tank[0] + '<sub>.</sub><sup>' + tank[1] + '</sup>');
                });
            }
        };
    });

    app.directive('irdFuel', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-');
                });
            }
        };
    });

    app.directive('irdPit', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-');
                });
            }
        };
    });

    app.directive('irdTake', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // element.text(n.toFixed(0))

                    element.text('-');
                });
            }
        };
    });

    app.directive('irdLap', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watchGroup(['ir.SessionInfo', 'ir.Lap', 'ir.SessionNum'], function (n, o) {
                    var info = n[0],
                        lap = n[1],
                        num = n[2];
                    if (!info || info == null || !lap || lap == null || num == null) {
                        element.text('-');
                        return;
                    }

                    var laps = void 0,
                        sym = '/';

                    if (info.Sessions[num].SessionLaps == 'unlimited') {
                        element.html(lap); // laps = '&infin;'
                        return;
                    }

                    if (info.Sessions[num].SessionLaps != 'unlimited') {
                        laps = info.Sessions[num].SessionLaps;
                    }

                    // @todo (estimated) lap calculator
                    // use &asymp; almost equal symbol

                    element.html(lap + '<sub>' + sym + '</sub><sup>' + laps + '</sup>');
                });
            }
        };
    });

    app.directive('irdPos', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.PlayerCarPosition', function (n, o) {
                    if (!n || n == null) {
                        element.text('-');
                        return;
                    }

                    element.html(n + '<sub>/</sub><sup>' + scope.drivers + '</sup>');
                });
            }
        };
    });

    app.directive('irdDelta', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.LapDeltaToBestLap', function (n, o) {
                    if (!n || n == null) {
                        element.html('--');
                        return;
                    }

                    n = n.toFixed(3);

                    if (n < 0) {
                        element.html(n);
                        return;
                    }

                    if (n > 0) {
                        element.html('+' + n);
                        return;
                    }

                    element.html('&plusmn;' + n);
                });
            }
        };
    });

    app.directive('irdDeltaColor', function () {
        return {
            link: function link(scope, element, attrs) {
                scope.$watch('ir.LapDeltaToBestLap', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    // faster
                    if (n < 0) {
                        element.removeClass('fasslowerter');
                        element.addClass('faster');
                        return;
                    }

                    // slower
                    if (n > 0) {
                        element.removeClass('faster');
                        element.addClass('slower');
                        return;
                    }

                    // equal
                    element.removeClass('faster');
                    element.removeClass('slower');
                });
            }
        };
    });

    app.directive('irdRevbar', ['Dashboard', function (Dashboard) {
        return {
            restrict: 'AEC',
            link: function link(scope, element, attrs) {
                scope.$watch('ir.RPM', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    var revs = scope.revs,
                        max = scope.max,
                        rpm = n;

                    // max width
                    if (rpm >= max) {
                        element.css('width', '100%');
                        return;
                    }

                    // in between
                    if (rpm) {
                        element.css('width', rpm / max * 100 + '%');
                        return;
                    }

                    // zero width
                    element.css('width', '0%');
                });
            }
        };
    }]);

    app.directive('irdMarkers', [function () {
        return {
            restrict: 'AEC',
            templateUrl: 'views/marker.html'
        };
    }]);

    app.directive('irdRevPit', ['Dashboard', function (Dashboard) {
        return {
            restrict: 'AEC',
            link: function link(scope, element, attrs) {
                scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & PIT_SPEED_LIMITER) {
                        if (element.css('display') != 'block') {
                            element.css('display', 'block');
                            element.addClass('blink');
                        }

                        return;
                    }

                    if (element.css('display') != 'none') {
                        element.removeClass('blink');
                        element.css('display', 'none');
                    }
                });
            }
        };
    }]);

    app.directive('irdRevShift', ['Dashboard', function (Dashboard) {
        return {
            restrict: 'AEC',
            link: function link(scope, element, attrs) {
                scope.$watch('ir.RPM', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    var blink = scope.blink,
                        rpm = n;

                    if (rpm >= blink) {
                        if (element.css('display') != 'block') {
                            element.css('display', 'block');
                        }
                    } else {
                        if (element.css('display') != 'none') {
                            element.css('display', 'none');
                        }
                    }
                });
            }
        };
    }]);
})(angular);
'use strict';

(function (angular, lodash) {
    'use strict';

    var app = angular.module('irdFilters', []);

    app.filter('lapTime', ['Dashboard', function (Dashboard) {
        return function (time) {
            if (null == time || typeof time == 'undefined' || 0 >= time) {
                return '--';
            }

            var min = parseInt(time / 60),
                sec = parseInt(time) - min * 60,
                ms = parseInt(lodash.split(time.toFixed(min < 9 ? 3 : 2), '.')[1]);

            return min + ':' + Dashboard.leftPad(sec, '00') + '.' + Dashboard.leftPad(ms, '000');
        };
    }]);

    app.filter('fixed', [function () {
        return function (number, fraction) {
            if (null == number || typeof number == 'undefined') {
                return '-';
            }

            return number.toFixed(fraction || 0);
        };
    }]);

    app.filter('speed', [function () {
        return function (speed) {
            if (null == speed || typeof speed == 'undefined') {
                return '-';
            }

            return (speed * 3.6).toFixed(0);
        };
    }]);

    app.filter('gear', [function () {
        return function (gear) {
            if (null == gear || typeof gear == 'undefined') {
                return '-';
            }

            if (gear == 0) {
                return 'N';
            }

            if (gear == -1) {
                return 'R';
            }

            return gear;
        };
    }]);
})(angular, _);
'use strict';

(function (window, angular, lodash) {
    'use strict';

    var app = angular.module('irdServices', []);

    app.service('Config', [function () {
        return new window.Config();
    }]);

    app.service('iRacing', ['$rootScope', 'Dashboard', function ($rootScope, Dashboard) {
        var ir = new window.IRacing(['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__'], [], 60);

        ir.onWSConnect = function () {
            $rootScope.wsConnected = true;

            return $rootScope.$apply();
        };
        ir.onWSDisconnect = function () {
            $rootScope.wsConnected = false;

            return $rootScope.$apply();
        };

        ir.onConnect = function () {
            $rootScope.connected = true;

            return $rootScope.$apply();
        };

        ir.onDisconnect = function () {
            $rootScope.connected = false;

            return $rootScope.$apply();
        };

        ir.onUpdate = function (keys) {
            if (keys.indexOf('DriverInfo') >= 0) {}

            if (keys.indexOf('SessionInfo') >= 0) {}

            if (keys.indexOf('WeekendInfo') >= 0) {}

            return $rootScope.$apply();
        };

        return ir;
    }]);

    app.service('Dashboard', [function () {
        return {
            formatLapTime: function formatLapTime(time) {
                if (null == time || 0 >= time) {
                    return '--';
                }

                var min = parseInt(time / 60),
                    sec = parseInt(time) - min * 60,
                    ms = parseInt(lodash.split(time.toFixed(min < 10 ? 3 : 2), '.')[1]);

                return min + ':' + this.leftPad(sec, '00') + '.' + this.leftPad(ms, '000');
            },

            leftPad: function leftPad(str, pad) {
                str = str.toString();

                return pad.substring(0, pad.length - str.length) + str;
            },

            numRevs: function numRevs(redLine) {
                var maxRev = this.parseThousands(redLine),
                    tryExact = parseInt(maxRev + '000');

                if (tryExact != redLine) {
                    var tryNext = tryExact + 1000;
                    if (tryNext > redLine) {
                        maxRev = this.parseThousands(tryNext);
                    }
                }

                return lodash.range(0, maxRev);
            },

            parseThousands: function parseThousands(rev) {
                rev = rev.toString();

                return rev.length == 5 ? parseInt(rev[0] + rev[1]) : parseInt(rev[0]);
            }
        };
    }]);
})(window, angular, _);
'use strict';

var Config = function Config() {
    this.ipc = require('electron').ipcRenderer;
};

Config.prototype.get = function () {
    return this.ipc.sendSync('getConfig');
};

Config.prototype.set = function (config) {
    return this.ipc.sendSync('setConfig', config);
};

window.Config = Config;
"use strict";

/* CoffeeScript converted, based on http://ir-apps.kutu.ru/libs/ir.coffee */
/* Copyright 2014 - http://kutu.ru/ */

var IRacing,
    slice = [].slice;

window.IRacing = IRacing = function () {
  function IRacing(requestParams, requestParamsOnce, fps, server, readIbt, record1) {
    this.requestParams = requestParams != null ? requestParams : [];
    this.requestParamsOnce = requestParamsOnce != null ? requestParamsOnce : [];
    this.fps = fps != null ? fps : 1;
    this.server = server != null ? server : '127.0.0.1:8182';
    this.readIbt = readIbt != null ? readIbt : false;
    this.record = record1 != null ? record1 : null;
    this.data = {};
    this.onConnect = null;
    this.onDisconnect = null;
    this.onUpdate = null;
    this.ws = null;
    this.onWSConnect = null;
    this.onWSDisconnect = null;
    this.reconnectTimeout = null;
    this.connected = false;
    this.firstTimeConnect = true;
    if (typeof record !== "undefined" && record !== null) {
      this.loadRecord();
    } else {
      this.connect();
    }
  }

  IRacing.prototype.connect = function () {
    this.ws = new WebSocket("ws://" + this.server + "/ws");
    this.ws.onopen = function (_this) {
      return function () {
        return _this.onopen.apply(_this, arguments);
      };
    }(this);
    this.ws.onmessage = function (_this) {
      return function () {
        return _this.onmessage.apply(_this, arguments);
      };
    }(this);
    return this.ws.onclose = function (_this) {
      return function () {
        return _this.onclose.apply(_this, arguments);
      };
    }(this);
  };

  IRacing.prototype.onopen = function () {
    var k;
    if (typeof this.onWSConnect === "function") {
      this.onWSConnect();
    }
    if (this.reconnectTimeout != null) {
      clearTimeout(this.reconnectTimeout);
    }
    for (k in this.data) {
      delete this.data[k];
    }
    return this.ws.send(JSON.stringify({
      fps: this.fps,
      readIbt: this.readIbt,
      requestParams: this.requestParams,
      requestParamsOnce: this.requestParamsOnce
    }));
  };

  IRacing.prototype.onmessage = function (event) {
    var data, k, keys, ref, v;
    data = JSON.parse(event.data.replace(/\bNaN\b/g, 'null'));
    if (data.disconnected) {
      this.connected = false;
      if (this.onDisconnect) {
        this.onDisconnect();
      }
    }
    if (data.connected) {
      for (k in this.data) {
        delete this.data[k];
      }
    }
    if (data.connected || this.firstTimeConnect && !this.connected) {
      this.firstTimeConnect = false;
      this.connected = true;
      if (this.onConnect) {
        this.onConnect();
      }
    }
    if (data.data) {
      keys = [];
      ref = data.data;
      for (k in ref) {
        v = ref[k];
        keys.push(k);
        this.data[k] = v;
      }
      if (this.onUpdate) {
        return this.onUpdate(keys);
      }
    }
  };

  IRacing.prototype.onclose = function () {
    if (typeof this.onWSDisconnect === "function") {
      this.onWSDisconnect();
    }
    if (this.ws) {
      this.ws.onopen = this.ws.onmessage = this.ws.onclose = null;
    }
    if (this.connected) {
      this.connected = false;
      if (this.onDisconnect) {
        this.onDisconnect();
      }
    }
    return this.reconnectTimeout = setTimeout(function (_this) {
      return function () {
        return _this.connect.apply(_this);
      };
    }(this), 2000);
  };

  IRacing.prototype.sendCommand = function () {
    var args, command;
    command = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this.ws.send(JSON.stringify({
      command: command,
      args: args
    }));
  };

  IRacing.prototype.loadRecord = function () {
    var r;
    r = new XMLHttpRequest();
    r.onreadystatechange = function () {
      var data;
      if (r.readyState === 4 && r.status === 200) {
        data = JSON.parse(r.responseText);
        return console.log(data);
      }
    };
    r.open('GET', this.record, true);
    return r.send();
  };

  return IRacing;
}();

// ---
// generated by coffee-script 1.9.2