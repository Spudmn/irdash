'use strict';

{
    var app = angular.module('ir', [
    // angular
    'ngRoute',

    // global
    'ir.constants', 'ir.controllers', 'ir.directives', 'ir.factories', 'ir.providers', 'ir.services', 'ir.filters',

    // internal
    'ir.internal.dashboards', 'ir.internal.iracing', 'ir.internal.shift_lights', 'ir.internal.shift_points', 'ir.internal.window',

    // dashboards
    'ir.dashboards.mercedes_amg_gt3', 'ir.dashboards.formula_renault_20']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'views/config.html'
        }).otherwise({
            redirectTo: '/config/dashboards'
        });
    }]);
}
'use strict';

{
    /*
     * EngineWarnings
     */
    var EngineWarnings = {
        WATER_TEMP_WARNING: 0x01,
        FUEL_PRESSURE_WARNING: 0x02,
        OIL_PRESSURE_WARNING: 0x04,
        ENGINE_STALLED: 0x08,
        PIT_SPEED_LIMITER: 0x10,
        REV_LIMITER_ACTIVE: 0x20
    };

    /*
     * Flags
     */

    // global flags
    var Flags = {
        CHECKERED: 0x0001,
        WHITE: 0x0002,
        GREEN: 0x0004,
        YELLOW: 0x0008,
        RED: 0x0010,
        BLUE: 0x0020,
        DEBRIS: 0x0040,
        CROSSED: 0x0080,
        YELLOW_WAVING: 0x0100,
        ONE_LAP_TO_GREEN: 0x0200,
        GREEN_HELD: 0x0400,
        TEN_TO_GO: 0x0800,
        FIVE_TO_GO: 0x1000,
        RANDOM_WAVING: 0x2000,
        CAUTION: 0x4000,
        CAUTION_WAVING: 0x8000,

        // drivers black flags
        BLACK: 0x010000,
        DISQUALIFY: 0x020000,
        SERVICIBLE: 0x040000, // car is allowed service (not a flag)
        FURLED: 0x080000,
        REPAIR: 0x100000
    };

    // start lights
    var StartLights = {
        START_HIDDEN: 0x10000000,
        START_READY: 0x20000000,
        START_SET: 0x40000000,
        START_GO: 0x80000000
    };

    /*
     * TrackLocation
     */
    var TrackLocation = {
        NOT_IN_WORLD: -1,
        OFF_TRACK: 0,
        IN_PIT_STALL: 1,
        APROACHING_PITS: 2,
        ON_TRACK: 3
    };

    /*
     * SessionStates
     */
    var SessionStates = {
        INVALID: 0,
        GET_IN_CAR: 1,
        WARMUP: 2,
        PARADE_LAPS: 3,
        RACING: 4,
        CHECKERED: 5,
        COOL_DOWN: 6
    };

    angular.module('ir.constants', []).constant('EngineWarnings', EngineWarnings).constant('Flags', Flags).constant('StartLights', StartLights).constant('TrackLocation', TrackLocation).constant('SessionStates', SessionStates);
}
'use strict';

{
    var app = angular.module('ir.controllers', []);

    app.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.key = function ($event) {
            if ($event.ctrlKey) {
                if ('Comma' == $event.code) {
                    $location.path('/config');
                }
            }
        };
    }]);

    app.controller('BaseCtrl', ['$scope', 'iRacing', 'Helpers', function ($scope, iRacing, Helpers) {
        $scope.ir = iRacing.data;

        $scope.revs = [];
        $scope.blink = 0;
        $scope.shift = 0;
        $scope.max = 0;
        $scope.red = 0;
        $scope.first = 0;
        $scope.last = 0;
        $scope.idle = 0;
        $scope.drivers = 0;

        $scope.$watch('ir.DriverInfo', function (n, o) {
            if (!n || null == n) {
                return;
            }

            $scope.revs = Helpers.numRevs(n.DriverCarRedLine);
            $scope.max = Helpers.highestRev($scope.revs);
            $scope.blink = n.DriverCarSLBlinkRPM;
            $scope.shift = n.DriverCarSLShiftRPM;
            $scope.first = n.DriverCarSLFirstRPM;
            $scope.last = n.DriverCarSLLastRPM;
            $scope.idle = n.DriverCarIdleRPM;
            $scope.red = n.DriverCarRedLine;
            $scope.drivers = n.Drivers.length;
        });
    }]);
}
"use strict";

{}
'use strict';

{
    var app = angular.module('ir.directives', []);

    app.directive('irdBack', ['$window', function ($window) {
        return {
            link: function link($scope, $element, $attrs) {
                $element.on('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);

    app.directive('irdRevPit', ['Helpers', 'EngineWarnings', function (Helpers, EngineWarnings) {
        return {
            restrict: 'AEC',
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & EngineWarnings.PIT_SPEED_LIMITER) {
                        if ($element.css('display') != 'block') {
                            $element.css('display', 'block');
                        }

                        return;
                    }

                    if ($element.css('display') != 'none') {
                        $element.css('display', 'none');
                    }
                });
            }
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.factories', []);
}
'use strict';

{
    var app = angular.module('ir.filters', []);

    app.filter('lapTime', ['Helpers', function (Helpers) {
        return function (time) {
            return Helpers.formatLapTime(time);
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
}
'use strict';

{
    var app = angular.module('ir.providers', []);
}
'use strict';

{
    var app = angular.module('ir.services', []);

    app.service('Cars', [function () {
        return new window.Cars();
    }]);

    app.service('iRacing', ['$rootScope', 'Kutu', function ($rootScope, Kutu) {
        var ir = new iRacingWrapper();

        ir.on('open', function () {
            $rootScope.opened = true;
            $rootScope.$apply();
        });
        ir.on('close', function () {
            $rootScope.opened = false;
            $rootScope.$apply();
        });
        ir.on('start', function () {
            $rootScope.started = true;
            $rootScope.$apply();
        });
        ir.on('stop', function () {
            $rootScope.started = false;
            $rootScope.$apply();
        });
        ir.on('error', function (err) {
            $rootScope.$apply();
        });
        ir.on('update', function (keys) {
            $rootScope.$apply();
        });

        ir.connect(Kutu.host, Kutu.fps, Kutu.ibt);

        return ir;
    }]);

    app.service('Helpers', [function () {
        return new window.Helpers();
    }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cars = function () {
    function Cars() {
        _classCallCheck(this, Cars);

        this.ipc = require('electron').ipcRenderer;
        this.load = true;
        this.data = {};

        this.get();
    }

    _createClass(Cars, [{
        key: 'get',
        value: function get() {
            if (this.load) {
                this.data = this.ipc.sendSync('getCars');
                this.load = false;
            }

            return this.data;
        }
    }]);

    return Cars;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);

        // @todo inject electron
        this.ipc = require('electron').ipcRenderer;
        this.load = true;
        this.data = {};
    }

    _createClass(Config, [{
        key: 'get',
        value: function get() {
            if (this.load) {
                this.data = this.ipc.sendSync('getConfig');
                this.load = false;
            }

            return this.data;
        }
    }, {
        key: 'set',
        value: function set(config) {
            this.load = true;

            return this.ipc.sendSync('setConfig', config);
        }
    }, {
        key: 'win',
        value: function win() {
            return this.ipc.sendSync('getWindow');
        }
    }]);

    return Config;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boards = function () {
    function Boards() {
        _classCallCheck(this, Boards);

        this.boards = {};
    }

    _createClass(Boards, [{
        key: "add",
        value: function add() {}
    }, {
        key: "all",
        value: function all() {
            return this.boards;
        }
    }]);

    return Boards;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
    function Helpers() {
        _classCallCheck(this, Helpers);
    }

    /* static */

    _createClass(Helpers, [{
        key: 'formatLapTime',
        value: function formatLapTime(time) {
            if (null == time || 0 >= time) {
                return '--';
            }

            var min = parseInt(time / 60),
                sec = parseInt(time) - min * 60,
                ms = parseInt(_.split(time.toFixed(min < 10 ? 3 : 2), '.')[1]);

            return min + ':' + this.leftPad(sec, 2) + '.' + this.leftPad(ms, 3);
        }

        /* static */
    }, {
        key: 'leftPad',
        value: function leftPad(str, pad) {
            return _.padStart(str, pad, 0);
        }

        /* static */
    }, {
        key: 'numRevs',
        value: function numRevs(redLine) {
            return _.range(0, _.ceil(redLine / 1000));
        }

        /* static */
    }, {
        key: 'highestRev',
        value: function highestRev(revs) {
            return (_.last(revs) + 1) * 1000;
        }
    }]);

    return Helpers;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');

var iRacingWrapper = function (_EventEmitter) {
    _inherits(iRacingWrapper, _EventEmitter);

    function iRacingWrapper() {
        _classCallCheck(this, iRacingWrapper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(iRacingWrapper).call(this));

        _this.ir = null;
        _this.data = {};
        return _this;
    }

    _createClass(iRacingWrapper, [{
        key: 'connect',
        value: function connect() {
            var server = arguments.length <= 0 || arguments[0] === undefined ? '127.0.0.1:8182' : arguments[0];

            var _this2 = this;

            var fps = arguments.length <= 1 || arguments[1] === undefined ? 30 : arguments[1];
            var ibt = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            this.disconnect();

            if (!this.ir) {
                this.ir = new iRacing(server, ['DriverInfo', 'SessionInfo', 'WeekendInfo', '__all_telemetry__'], [], fps, ibt);

                this.ir.on('open', function () {
                    _this2.emit('open');
                });
                this.ir.on('close', function () {
                    _this2.emit('close');
                });
                this.ir.on('start', function () {
                    _this2.emit('start');
                });
                this.ir.on('stop', function () {
                    _this2.emit('stop');
                });
                this.ir.on('error', function (err) {
                    _this2.emit('error', err);
                });
                this.ir.on('update', function (keys) {
                    _.each(keys, function (key) {
                        _this2.data[key] = _this2.ir.data[key];
                    });

                    _this2.emit('update', keys);
                });
            } else {
                this.ir.server = server;
                this.ir.fps = fps;
                this.ir.ibt = ibt;

                this.ir.connect();
            }
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            var _this3 = this;

            if (this.ir) {
                this.ir.disconnect();

                _.forIn(this.data, function (value, key) {
                    delete _this3.data[key];
                });
            }
        }
    }]);

    return iRacingWrapper;
}(EventEmitter);

var iRacing = function (_EventEmitter2) {
    _inherits(iRacing, _EventEmitter2);

    function iRacing() {
        var server = arguments.length <= 0 || arguments[0] === undefined ? '127.0.0.1:8182' : arguments[0];
        var params = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var once = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
        var fps = arguments.length <= 3 || arguments[3] === undefined ? 30 : arguments[3];
        var ibt = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

        _classCallCheck(this, iRacing);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(iRacing).call(this));

        _this4.server = server;
        _this4.params = params;
        _this4.once = once;
        _this4.fps = fps;
        _this4.ibt = ibt;

        _this4.reconnect = null;
        _this4.firstTime = true;
        _this4.connected = false;
        _this4.running = false;
        _this4.data = {};
        _this4.ws = null;

        _this4.connect();
        return _this4;
    }

    _createClass(iRacing, [{
        key: 'connect',
        value: function connect() {
            var _this5 = this;

            this.ws = new WebSocket('ws://' + this.server + '/ws');
            this.ws.onopen = function () {
                _this5.open.apply(_this5, arguments);
            };
            this.ws.onerror = function () {
                _this5.error.apply(_this5, arguments);
            };
            this.ws.onmessage = function () {
                _this5.message.apply(_this5, arguments);
            };
            this.ws.onclose = function () {
                _this5.close.apply(_this5, arguments);
            };
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            if (this.ws) {
                this.ws.onopen = this.ws.onmessage = this.ws.onclose = null;
                this.ws.close();
                this.ws = null;
            }

            if (this.reconnect) {
                clearTimeout(this.reconnect);
                this.reconnect = null;
            }
        }
    }, {
        key: 'open',
        value: function open() {
            var _this6 = this;

            this.emit('open');

            if (this.reconnected) {
                clearTimeout(this.reconnect);
                this.reconnect = null;
            }

            _.forIn(this.data, function (value, key) {
                delete _this6.data[key];
            });

            this.ws.send(JSON.stringify({
                fps: this.fps,
                readIbt: this.ibt,
                requestParams: this.params,
                requestParamsOnce: this.once
            }));
        }
    }, {
        key: 'close',
        value: function close() {
            var _this7 = this;

            this.emit('close');
            if (this.running) {
                this.running = false;
                this.emit('stop');
            }

            this.reconnect = setTimeout(function () {
                _this7.connect();
            }, 2000);
        }
    }, {
        key: 'error',
        value: function error(err) {
            this.emit('error', err);
        }
    }, {
        key: 'message',
        value: function message(event) {
            var _this8 = this;

            var data = JSON.parse(event.data.replace(/\bNaN\b/g, 'null'));

            if (data.disconnected) {
                this.running = false;
                this.emit('stop');
            }

            if (data.connected) {
                _.forIn(this.data, function (value, key) {
                    delete _this8.data[key];
                });
            }

            if (data.connected || this.firstTime && !this.connected) {
                this.firstTime = false;
                this.running = true;
                this.emit('start');
            }

            if (data.data) {
                (function () {
                    var keys = [];
                    _.forIn(data.data, function (value, key) {
                        _this8.data[key] = value;
                        keys.push(key);
                    });

                    _this8.emit('update', keys);
                })();
            }
        }
    }]);

    return iRacing;
}(EventEmitter);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kutu = function () {
    function Kutu() {
        _classCallCheck(this, Kutu);

        this.ipc = require('electron').ipcRenderer;
        this.load = true;
        this.data = {};
    }

    _createClass(Kutu, [{
        key: 'get',
        value: function get() {
            if (this.load) {
                this.data = this.ipc.sendSync('getKutu');
                this.load = false;
            }

            return this.data;
        }
    }, {
        key: 'set',
        value: function set(kutu) {
            this.load = true;

            return this.ipc.sendSync('setKutu', kutu);
        }
    }, {
        key: 'host',
        get: function get() {
            return this.get().host;
        }
    }, {
        key: 'fps',
        get: function get() {
            return this.get().fps;
        }
    }, {
        key: 'ibt',
        get: function get() {
            return this.get().ibt;
        }
    }]);

    return Kutu;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShiftLights = function ShiftLights() {
    _classCallCheck(this, ShiftLights);
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShiftPoints = function () {
    function ShiftPoints() {
        _classCallCheck(this, ShiftPoints);

        this.ipc = require('electron').ipcRenderer;
        this.load = true;
        this.data = {};

        this.get();
    }

    _createClass(ShiftPoints, [{
        key: 'get',
        value: function get() {
            if (this.load) {
                this.data = this.ipc.sendSync('getShiftPoints');
                this.load = false;
            }

            return this.data;
        }
    }, {
        key: 'set',
        value: function set(shiftPoints) {
            this.load = true;

            return this.ipc.sendSync('setShiftPoints', shiftPoints);
        }
    }, {
        key: 'forCarAndGear',
        value: function forCarAndGear(carId, gear) {
            if (!this.data.hasOwnProperty(carId)) {
                return null;
            }

            if (!this.data[carId].hasOwnProperty(gear)) {
                return null;
            }

            return this.data[carId][gear];
        }
    }]);

    return ShiftPoints;
}();
'use strict';

{
    var app = angular.module('ir.dashboards.formula_renault_20.controllers', []);

    app.controller('FormulaRenault20Ctrl', ['$scope', function ($scope) {
        $scope.times = function (times) {
            return _.range(0, times);
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.dashboards.formula_renault_20', ['ir.dashboards.formula_renault_20.controllers', 'ir.dashboards.formula_renault_20.directives']);

    // app.value('board', 'formula_renault_20')

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboards/formula_renault_20', {
            templateUrl: 'views/dashboards/formula_renault_20.html',
            controller: 'FormulaRenault20Ctrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.dashboards.formula_renault_20.directives', []);

    app.directive('irdBoardsRenaultRevbar', ['$document', 'Helpers', 'ShiftPoints', function ($document, Helpers, ShiftPoints) {
        return {
            restrict: 'AEC',
            link: function link($scope, $element, $attrs) {
                var revs = void 0,
                    share = void 0,
                    carId = void 0,
                    gear = void 0;

                $scope.$watch('$last', function () {
                    revs = $element.children().children();
                    share = 100 / revs.length;
                });

                $scope.$watch('ir.DriverInfo', function (n, o) {
                    if (!n || null == n || n < 1) {
                        return;
                    }

                    carId = _.find(n.Drivers, function (o) {
                        return o.CarIdx == n.DriverCarIdx;
                    }).CarID;
                });

                $scope.$watch('ir.Gear', function (n, o) {
                    gear = n;
                });

                $scope.$watch('ir.RPM', function (n, o) {
                    if (!n || n == null || !$scope.blink || !$scope.idle) {
                        return;
                    }

                    var shift = ShiftPoints.forCarAndGear(carId, gear) || $scope.blink,
                        idle = $scope.idle,
                        rpm = n;

                    if (rpm >= shift) {
                        if (!$element.hasClass('shift')) {
                            $element.addClass('shift');
                            return;
                        }
                    } else {
                        if ($element.hasClass('shift')) {
                            $element.removeClass('shift');
                        }
                    }

                    var percent = (rpm - idle) / (shift - idle) * 100;
                    _.forEach(revs, function (rev, index) {
                        var $element = angular.element(rev);
                        if (percent >= share * index) {
                            if ($element.css('display') != 'block') {
                                $element.css('display', 'block');
                            }
                        } else {
                            if ($element.css('display') != 'none') {
                                $element.css('display', 'none');
                            }
                        }
                    });
                });
            }
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.dashboards.mercedes_amg_gt3.controllers', []);

    app.controller('MercedesAmgGt3Ctrl', ['$scope', function ($scope) {}]);
}
'use strict';

{
    var app = angular.module('ir.dashboards.mercedes_amg_gt3', ['ir.dashboards.mercedes_amg_gt3.controllers', 'ir.dashboards.mercedes_amg_gt3.directives', 'ir.dashboards.mercedes_amg_gt3.filters']);

    // app.value('board', 'mercedes_amg_gt3')

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboards/mercedes_amg_gt3', {
            templateUrl: 'views/dashboards/mercedes_amg_gt3.html',
            controller: 'MercedesAmgGt3Ctrl'
        });
    }]);
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
    var app = angular.module('ir.dashboards.mercedes_amg_gt3.directives', []);

    app.directive('irdBoardsAmgGt3FuelPressWarn', ['EngineWarnings', function (EngineWarnings) {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & EngineWarnings.FUEL_PRESSURE_WARNING) {
                        $element.addClass('warning');
                    } else {
                        $element.removeClass('warning');
                    }
                });
            }
        };
    }]);

    app.directive('irdBoardsAmgGt3WaterTempWarn', ['EngineWarnings', function (EngineWarnings) {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & EngineWarnings.WATER_TEMP_WARNING) {
                        $element.addClass('warning');
                    } else {
                        $element.removeClass('warning');
                    }
                });
            }
        };
    }]);

    app.directive('irdBoardsAmgGt3WaterTemp', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.WaterTemp', function (n, o) {
                    if (!n || n == null) {
                        $element.text('-');
                        return;
                    }

                    var _$split = _.split(n.toFixed(1), '.');

                    var _$split2 = _slicedToArray(_$split, 2);

                    var temperature = _$split2[0];
                    var fracture = _$split2[1];

                    // @todo refactor into template / sub-directive

                    $element.html(temperature + '<sub>.</sub><sup>' + fracture + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3OilPressWarn', ['EngineWarnings', function (EngineWarnings) {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.EngineWarnings', function (n, o) {
                    if (n & EngineWarnings.OIL_PRESSURE_WARNING) {
                        $element.addClass('warning');
                    } else {
                        $element.removeClass('warning');
                    }
                });
            }
        };
    }]);

    app.directive('irdBoardsAmgGt3OilTemp', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.OilTemp', function (n, o) {
                    if (!n || n == null) {
                        $element.text('-');
                        return;
                    }

                    var _$split3 = _.split(n.toFixed(1), '.');

                    var _$split4 = _slicedToArray(_$split3, 2);

                    var temperature = _$split4[0];
                    var fracture = _$split4[1];

                    // @todo refactor into template / sub-directive

                    $element.html(temperature + '<sub>.</sub><sup>' + fracture + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3BrakeBias', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.dcBrakeBias', function (n, o) {
                    if (!n || n == null) {
                        $element.text('-');
                        return;
                    }

                    var _$split5 = _.split(n.toFixed(1), '.');

                    var _$split6 = _slicedToArray(_$split5, 2);

                    var bias = _$split6[0];
                    var fracture = _$split6[1];

                    // @todo refactor into template / sub-directive

                    $element.html(bias + '<sub>.</sub><sup>' + fracture + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Voltage', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.Voltage', function (n, o) {
                    if (!n || n == null) {
                        $element.text('-');
                        return;
                    }

                    var _$split7 = _.split(n.toFixed(1), '.');

                    var _$split8 = _slicedToArray(_$split7, 2);

                    var voltage = _$split8[0];
                    var fracture = _$split8[1];

                    // @todo refactor into template / sub-directive

                    $element.html(voltage + '<sub>.</sub><sup>' + fracture + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Tank', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-');
                        return;
                    }

                    var _$split9 = _.split(n.toFixed(1), '.');

                    var _$split10 = _slicedToArray(_$split9, 2);

                    var tank = _$split10[0];
                    var fracture = _$split10[1];

                    // @todo refactor into template / sub-directive

                    $element.html(tank + '<sub>.</sub><sup>' + fracture + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Fuel', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Pit', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Take', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.FuelLevel', function (n, o) {
                    if (!n || n == null || 0 >= n) {
                        $element.text('-');
                        return;
                    }

                    // @todo fuel calculator
                    // $element.text(n.toFixed(0))

                    $element.text('-');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Lap', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watchGroup(['ir.SessionInfo', 'ir.Lap', 'ir.SessionNum'], function (n, o) {
                    var _n = _slicedToArray(n, 3);

                    var info = _n[0];
                    var lap = _n[1];
                    var num = _n[2];

                    if (!info || info == null || !lap || lap == null || num == null) {
                        $element.text('-');
                        return;
                    }

                    var symbol = '/',
                        laps = void 0;

                    if (info.Sessions[num].SessionLaps == 'unlimited') {
                        $element.html(lap); // laps = '&infin;'
                        return;
                    }

                    if (info.Sessions[num].SessionLaps != 'unlimited') {
                        laps = info.Sessions[num].SessionLaps;
                    }

                    // @todo (estimated) lap calculator
                    // use &asymp; almost equal symbol

                    // @todo refactor into template / sub-directive
                    $element.html(lap + '<sub>' + symbol + '</sub><sup>' + laps + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Pos', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.PlayerCarPosition', function (n, o) {
                    if (!n || n == null) {
                        $element.text('-');
                        return;
                    }

                    // @todo refactor into template / sub-directive
                    $element.html(n + '<sub>/</sub><sup>' + $scope.drivers + '</sup>');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3Delta', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.LapDeltaToBestLap', function (n, o) {
                    if (!n || n == null) {
                        $element.html('--');
                        return;
                    }

                    n = n.toFixed(3);

                    if (n < 0) {
                        $element.html(n);
                        return;
                    }

                    if (n > 0) {
                        $element.html('+' + n);
                        return;
                    }

                    $element.html('&plusmn;' + n);
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3DeltaColor', function () {
        return {
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.LapDeltaToBestLap', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    // faster
                    if (n < 0) {
                        $element.removeClass('fasslowerter');
                        $element.addClass('faster');
                        return;
                    }

                    // slower
                    if (n > 0) {
                        $element.removeClass('faster');
                        $element.addClass('slower');
                        return;
                    }

                    // equal
                    $element.removeClass('faster');
                    $element.removeClass('slower');
                });
            }
        };
    });

    app.directive('irdBoardsAmgGt3RevShift', ['Helpers', 'ShiftPoints', function (Helpers, ShiftPoints) {
        return {
            restrict: 'AEC',
            link: function link($scope, $element, $attrs) {
                var gear = void 0,
                    carId = void 0;

                $scope.$watch('ir.DriverInfo', function (n, o) {
                    if (!n || null == n || n < 1) {
                        return;
                    }

                    carId = _.find(n.Drivers, function (o) {
                        return o.CarIdx == n.DriverCarIdx;
                    }).CarID;
                });

                $scope.$watch('ir.Gear', function (n, o) {
                    gear = n;
                });

                $scope.$watch('ir.RPM', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    var shift = ShiftPoints.forCarAndGear(carId, gear) || $scope.blink,
                        rpm = n;

                    if (rpm >= shift) {
                        if ($element.css('display') != 'block') {
                            $element.css('display', 'block');
                        }
                    } else {
                        if ($element.css('display') != 'none') {
                            $element.css('display', 'none');
                        }
                    }
                });
            }
        };
    }]);

    app.directive('irdBoardsAmgGt3RevbarAmgGt3', ['Helpers', function (Helpers) {
        return {
            restrict: 'AEC',
            link: function link($scope, $element, $attrs) {
                $scope.$watch('ir.RPM', function (n, o) {
                    if (!n || n == null) {
                        return;
                    }

                    var max = $scope.max,
                        rpm = n;

                    // max width
                    if (rpm >= max) {
                        $element.css('width', '100%');
                        return;
                    }

                    // in between
                    if (rpm) {
                        $element.css('width', rpm / max * 100 + '%');
                        return;
                    }

                    // zero width
                    $element.css('width', '0%');
                });
            }
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.dashboards.mercedes_amg_gt3.filters', []);
}
'use strict';

{
    var app = angular.module('ir.internal.dashboards.controllers', []);

    app.controller('DashboardsCtrl', ['$scope', function ($scope) {}]);
}
'use strict';

{
    var app = angular.module('ir.internal.dashboards', ['ir.internal.dashboards.controllers', 'ir.internal.dashboards.services']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config/dashboards', {
            templateUrl: 'views/dashboards.html',
            controller: 'DashboardsCtrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.dashboards.services', []);

    app.service('Boards', [function () {
        return new window.Boards();
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.iracing.controllers', []);

    app.controller('iRacingCtrl', ['$scope', 'Kutu', 'iRacing', function ($scope, Kutu, iRacing) {
        $scope.kutu = Kutu.get();
        $scope.save = function (kutu) {
            Kutu.set(kutu);

            iRacing.connect(Kutu.host, Kutu.fps, Kutu.ibt);
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.iracing', ['ir.internal.iracing.controllers', 'ir.internal.iracing.services']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config/iracing', {
            templateUrl: 'views/iracing.html',
            controller: 'iRacingCtrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.iracing.services', []);

    app.service('Kutu', [function () {
        return new Kutu();
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_lights.controllers', []);

    app.controller('ShiftLightsCtrl', ['$scope', function ($scope) {}]);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_lights', ['ir.internal.shift_lights.controllers', 'ir.internal.shift_lights.services']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config/shift-lights', {
            templateUrl: 'views/shift_lights.html',
            controller: 'ShiftLightsCtrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_lights.services', []);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_points.controllers', []);

    app.controller('ShiftPointsCtrl', ['$scope', 'Cars', 'ShiftPoints', function ($scope, Cars, ShiftPoints) {
        $scope.cars = Cars.get();
        $scope.shifts = ShiftPoints.get();

        $scope.carId = null;
        $scope.gears = {};

        $scope.$watch('carId', function (n, o) {
            if (!n) {
                return;
            }

            if (!$scope.shifts.hasOwnProperty(n)) {
                $scope.gears = {};
                return;
            }

            $scope.gears = $scope.shifts[n];
        });

        $scope.$watch('gears', function (n, o) {
            if (!n || !_.keys(n).length || !_.sum(_.values(n))) {
                delete $scope.shifts[$scope.carId];
                return;
            }

            $scope.shifts[$scope.carId] = n;
        }, true);

        $scope.save = function (shifts) {
            $scope.shifts = ShiftPoints.set(shifts);
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_points', ['ir.internal.shift_points.controllers', 'ir.internal.shift_points.services']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config/shift-points', {
            templateUrl: 'views/shift_points.html',
            controller: 'ShiftPointsCtrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.shift_points.services', []);

    app.service('ShiftPoints', [function () {
        return new ShiftPoints();
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.window.controllers', []);

    app.controller('WindowCtrl', ['$scope', 'Config', function ($scope, Config) {
        $scope.config = Config.get();
        $scope.window = Config.win();

        $scope.save = function (config) {
            $scope.config = Config.set(config);
        };
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.window', ['ir.internal.window.controllers', 'ir.internal.window.services']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/config/window', {
            templateUrl: 'views/window.html',
            controller: 'WindowCtrl'
        });
    }]);
}
'use strict';

{
    var app = angular.module('ir.internal.window.services', []);

    app.service('Config', [function () {
        return new Config();
    }]);
}