"use strict";var app=angular.module("ir",["ngRoute","ir.constants","ir.controllers","ir.directives","ir.factories","ir.providers","ir.services","ir.filters","ir.internal.dashboards","ir.internal.iracing","ir.internal.shift_lights","ir.internal.shift_points","ir.internal.window","ir.dashboards.mercedes_amg_gt3","ir.dashboards.formula_renault_20"]);app.config(["$routeProvider",function(r){r.when("/config",{templateUrl:"views/config.html"}).otherwise({redirectTo:"/config/dashboards"})}]);
"use strict";var EngineWarnings={WATER_TEMP_WARNING:1,FUEL_PRESSURE_WARNING:2,OIL_PRESSURE_WARNING:4,ENGINE_STALLED:8,PIT_SPEED_LIMITER:16,REV_LIMITER_ACTIVE:32},Flags={CHECKERED:1,WHITE:2,GREEN:4,YELLOW:8,RED:16,BLUE:32,DEBRIS:64,CROSSED:128,YELLOW_WAVING:256,ONE_LAP_TO_GREEN:512,GREEN_HELD:1024,TEN_TO_GO:2048,FIVE_TO_GO:4096,RANDOM_WAVING:8192,CAUTION:16384,CAUTION_WAVING:32768,BLACK:65536,DISQUALIFY:131072,SERVICIBLE:262144,FURLED:524288,REPAIR:1048576},StartLights={START_HIDDEN:268435456,START_READY:536870912,START_SET:1073741824,START_GO:2147483648},TrackLocation={NOT_IN_WORLD:-1,OFF_TRACK:0,IN_PIT_STALL:1,APROACHING_PITS:2,ON_TRACK:3},SessionStates={INVALID:0,GET_IN_CAR:1,WARMUP:2,PARADE_LAPS:3,RACING:4,CHECKERED:5,COOL_DOWN:6};angular.module("ir.constants",[]).constant("EngineWarnings",EngineWarnings).constant("Flags",Flags).constant("StartLights",StartLights).constant("TrackLocation",TrackLocation).constant("SessionStates",SessionStates);
"use strict";var app=angular.module("ir.controllers",[]);app.controller("MainCtrl",["$scope","$location",function(r,e){r.key=function(r){r.ctrlKey&&"Comma"==r.code&&e.path("/config")}}]),app.controller("BaseCtrl",["$scope","iRacing","Helpers",function(r,e,n){r.opened=!1,r.started=!1,e.on("open",function(){r.opened=!0}),e.on("close",function(){r.opened=!1}),e.on("start",function(){r.started=!0}),e.on("stop",function(){r.started=!1}),e.on("update",function(){r.$apply()}),r.ir=e.data,r.revs=[],r.blink=0,r.shift=0,r.max=0,r.red=0,r.first=0,r.last=0,r.idle=0,r.drivers=0,r.carId=null,r.$watch("ir.DriverInfo",function(e,i){e&&null!=e&&(r.revs=n.numRevs(e.DriverCarRedLine),r.max=n.highestRev(r.revs),r.blink=e.DriverCarSLBlinkRPM,r.shift=e.DriverCarSLShiftRPM,r.first=e.DriverCarSLFirstRPM,r.last=e.DriverCarSLLastRPM,r.idle=e.DriverCarIdleRPM,r.red=e.DriverCarRedLine,r.drivers=e.Drivers.length,r.carId=_.find(e.Drivers,function(r){return r.CarIdx==e.DriverCarIdx}).CarID)})}]);
"use strict";
"use strict";var app=angular.module("ir.directives",[]);app.directive("irdBack",["$window",function(i){return{link:function(n,c,r){c.on("click",function(){i.history.back()})}}}]),app.directive("irdRevPit",["Helpers","EngineWarnings",function(i,n){return{restrict:"ACE",link:function(i,c,r){i.$watch("ir.EngineWarnings",function(i,r){return i&n.PIT_SPEED_LIMITER?void("block"!=c.css("display")&&c.css("display","block")):void("none"!=c.css("display")&&c.css("display","none"))})}}}]);
"use strict";var app=angular.module("ir.factories",[]);
"use strict";var app=angular.module("ir.filters",[]);app.filter("lapTime",["Helpers",function(e){return function(n){return e.formatLapTime(n)}}]),app.filter("fixed",[function(){return function(e,n){return null==e||"undefined"==typeof e?"-":e.toFixed(n||0)}}]),app.filter("speed",[function(){return function(e){return null==e||"undefined"==typeof e?"-":(3.6*e).toFixed(0)}}]),app.filter("gear",[function(){return function(e){return null==e||"undefined"==typeof e?"-":0==e?"N":-1==e?"R":e}}]);
"use strict";var app=angular.module("ir.providers",[]);
"use strict";var app=angular.module("ir.services",[]);app.service("Cars",[function(){return new window.Cars}]),app.service("iRacing",["Kutu",function(e){var n=["DriverInfo","SessionInfo","WeekendInfo","__all_telemetry__"],r=[];return new iRacing(e.host,n,r,e.fps,e.ibt)}]),app.service("Helpers",[function(){return new window.Helpers}]);
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),Cars=function(){function e(){_classCallCheck(this,e),this.ipc=require("electron").ipcRenderer,this.load=!0,this.data={},this.get()}return _createClass(e,[{key:"get",value:function(){return this.load&&(this.data=this.ipc.sendSync("getCars"),this.load=!1),this.data}}]),e}();
"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}(),Config=function(){function e(){_classCallCheck(this,e),this.ipc=require("electron").ipcRenderer,this.load=!0,this.data={}}return _createClass(e,[{key:"get",value:function(){return this.load&&(this.data=this.ipc.sendSync("getConfig"),this.load=!1),this.data}},{key:"set",value:function(e){return this.load=!0,this.ipc.sendSync("setConfig",e)}},{key:"win",value:function(){return this.ipc.sendSync("getWindow")}}]),e}();
"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,a,r){return a&&e(n.prototype,a),r&&e(n,r),n}}(),Boards=function(){function e(){_classCallCheck(this,e),this.boards={}}return _createClass(e,[{key:"add",value:function(){}},{key:"all",value:function(){return this.boards}}]),e}();
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Helpers=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"formatLapTime",value:function(e){if(null==e||0>=e)return"--";var t=parseInt(e/60),n=parseInt(e)-60*t,r=parseInt(_.split(e.toFixed(10>t?3:2),".")[1]);return t+":"+this.leftPad(n,2)+"."+this.leftPad(r,3)}},{key:"leftPad",value:function(e,t){return _.padStart(e,t,0)}},{key:"numRevs",value:function(e){return _.range(0,_.ceil(e/1e3))}},{key:"highestRev",value:function(e){return 1e3*(_.last(e)+1)}}]),e}();
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),EventEmitter=require("events"),iRacing=function(t){function e(){var t=arguments.length<=0||void 0===arguments[0]?"127.0.0.1:8182":arguments[0],n=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],i=arguments.length<=2||void 0===arguments[2]?[]:arguments[2],s=arguments.length<=3||void 0===arguments[3]?30:arguments[3],o=arguments.length<=4||void 0===arguments[4]?!1:arguments[4];_classCallCheck(this,e);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(e).call(this));return r.server=t,r.params=n,r.once=i,r.fps=s,r.ibt=o,r.reconnect=null,r.firstTime=!0,r.connected=!1,r.running=!1,r.data={},r.ws=null,r.connect(),r}return _inherits(e,t),_createClass(e,[{key:"connect",value:function(){var t=this;this.ws=new WebSocket("ws://"+this.server+"/ws"),this.ws.onopen=function(){t.open.apply(t,arguments)},this.ws.onerror=function(){t.error.apply(t,arguments)},this.ws.onmessage=function(){t.message.apply(t,arguments)},this.ws.onclose=function(){t.close.apply(t,arguments)}}},{key:"disconnect",value:function(){var t=this;this.ws&&(this.ws.onopen=null,this.ws.onmessage=null,this.ws.onclose=null,this.ws.onerror=null,this.ws.close(),this.ws=null),this.running&&(this.running=!1,this.emit("stop")),this.connected=!1,this.firstTime=!0,this.reconnect&&(clearTimeout(this.reconnect),this.reconnect=null),_.forIn(this.data,function(e,n){delete t.data[n]})}},{key:"open",value:function(){var t=this;this.emit("open"),this.reconnect&&(clearTimeout(this.reconnect),this.reconnect=null),_.forIn(this.data,function(e,n){delete t.data[n]}),this.ws.send(JSON.stringify({fps:this.fps,readIbt:this.ibt,requestParams:this.params,requestParamsOnce:this.once}))}},{key:"close",value:function(){var t=this;this.emit("close"),this.running&&(this.running=!1,this.emit("stop")),this.connected&&(this.connected=!1),this.reconnect=setTimeout(function(){t.connect()},2e3)}},{key:"error",value:function(t){this.emit("error",t)}},{key:"message",value:function(t){var e=this,n=JSON.parse(t.data.replace(/\bNaN\b/g,"null"));n.disconnected&&(this.running=!1,this.emit("stop")),n.connected&&_.forIn(this.data,function(t,n){delete e.data[n]}),(n.connected||this.firstTime&&!this.running)&&(this.firstTime=!1,this.running=!0,this.emit("start")),n.data&&!function(){var t=[];_.forIn(n.data,function(n,i){e.data[i]=n,t.push(i)}),e.emit("update",t)}()}}]),e}(EventEmitter);
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),Kutu=function(){function t(){_classCallCheck(this,t),this.ipc=require("electron").ipcRenderer,this.load=!0,this.data={}}return _createClass(t,[{key:"get",value:function(){return this.load&&(this.data=this.ipc.sendSync("getKutu"),this.load=!1),this.data}},{key:"set",value:function(t){return this.load=!0,this.ipc.sendSync("setKutu",t)}},{key:"host",get:function(){return this.get().host}},{key:"fps",get:function(){return this.get().fps}},{key:"ibt",get:function(){return this.get().ibt}}]),t}();
"use strict";function _classCallCheck(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")}var ShiftLights=function a(){_classCallCheck(this,a)};
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),ShiftPoints=function(){function t(){_classCallCheck(this,t),this.ipc=require("electron").ipcRenderer,this.load=!0,this.data={},this.get()}return _createClass(t,[{key:"get",value:function(){return this.load&&(this.data=this.ipc.sendSync("getShiftPoints"),this.load=!1),this.data}},{key:"set",value:function(t){return this.load=!0,this.ipc.sendSync("setShiftPoints",t)}},{key:"forCarAndGear",value:function(t,e){return this.data.hasOwnProperty(t)&&this.data[t].hasOwnProperty(e)?this.data[t][e]:null}}]),t}();
"use strict";var app=angular.module("ir.dashboards.formula_renault_20.controllers",[]);app.controller("FormulaRenault20Ctrl",["$scope",function(r){r.times=function(r){return _.range(0,r)}}]);
"use strict";var app=angular.module("ir.dashboards.formula_renault_20",["ir.dashboards.formula_renault_20.controllers","ir.dashboards.formula_renault_20.directives"]);app.config(["$routeProvider",function(r){r.when("/dashboards/formula_renault_20",{templateUrl:"views/dashboards/formula_renault_20.html",controller:"FormulaRenault20Ctrl"})}]);
"use strict";var _slicedToArray=function(){function r(r,i){var n=[],t=!0,a=!1,e=void 0;try{for(var l,s=r[Symbol.iterator]();!(t=(l=s.next()).done)&&(n.push(l.value),!i||n.length!==i);t=!0);}catch(o){a=!0,e=o}finally{try{!t&&s["return"]&&s["return"]()}finally{if(a)throw e}}return n}return function(i,n){if(Array.isArray(i))return i;if(Symbol.iterator in Object(i))return r(i,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),app=angular.module("ir.dashboards.formula_renault_20.directives",[]);app.directive("irdBoardsRenaultRevbar",["$document","Helpers","ShiftPoints",function(r,i,n){return{restrict:"ACE",link:function(r,i,t){var a=void 0,e=void 0;r.$watch("$last",function(){a=i.children().children(),e=100/a.length}),r.$watchGroup(["ir.Gear","ir.RPM"],function(t,l){var s=_slicedToArray(t,2),o=s[0],c=s[1];if(o&&null!=o&&c&&null!=c&&r.blink&&r.idle){var u=n.forCarAndGear(r.carId,o)||r.blink,d=r.idle;if(c>=u){if(!i.hasClass("shift"))return void i.addClass("shift")}else i.hasClass("shift")&&i.removeClass("shift");var f=(c-d)/(u-d)*100;_.forEach(a,function(r,i){var n=angular.element(r);f>=e*i?"block"!=n.css("display")&&n.css("display","block"):"none"!=n.css("display")&&n.css("display","none")})}})}}}]);
"use strict";var app=angular.module("ir.dashboards.mercedes_amg_gt3.controllers",[]);app.controller("MercedesAmgGt3Ctrl",["$scope",function(r){}]);
"use strict";var app=angular.module("ir.dashboards.mercedes_amg_gt3",["ir.dashboards.mercedes_amg_gt3.controllers","ir.dashboards.mercedes_amg_gt3.directives","ir.dashboards.mercedes_amg_gt3.filters"]);app.config(["$routeProvider",function(e){e.when("/dashboards/mercedes_amg_gt3",{templateUrl:"views/dashboards/mercedes_amg_gt3.html",controller:"MercedesAmgGt3Ctrl"})}]);
"use strict";var _slicedToArray=function(){function i(i,r){var n=[],t=!0,e=!1,a=void 0;try{for(var s,o=i[Symbol.iterator]();!(t=(s=o.next()).done)&&(n.push(s.value),!r||n.length!==r);t=!0);}catch(u){e=!0,a=u}finally{try{!t&&o["return"]&&o["return"]()}finally{if(e)throw a}}return n}return function(r,n){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return i(r,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),app=angular.module("ir.dashboards.mercedes_amg_gt3.directives",[]);app.directive("irdBoardsAmgGt3FuelPressWarn",["EngineWarnings",function(i){return{link:function(r,n,t){r.$watch("ir.EngineWarnings",function(r,t){r&i.FUEL_PRESSURE_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}]),app.directive("irdBoardsAmgGt3WaterTempWarn",["EngineWarnings",function(i){return{link:function(r,n,t){r.$watch("ir.EngineWarnings",function(r,t){r&i.WATER_TEMP_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}]),app.directive("irdBoardsAmgGt3WaterTemp",function(){return{link:function(i,r,n){i.$watch("ir.WaterTemp",function(i,n){if(!i||null==i)return void r.text("-");var t=_.split(i.toFixed(1),"."),e=_slicedToArray(t,2),a=e[0],s=e[1];r.html(a+"<sub>.</sub><sup>"+s+"</sup>")})}}}),app.directive("irdBoardsAmgGt3OilPressWarn",["EngineWarnings",function(i){return{link:function(r,n,t){r.$watch("ir.EngineWarnings",function(r,t){r&i.OIL_PRESSURE_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}]),app.directive("irdBoardsAmgGt3OilTemp",function(){return{link:function(i,r,n){i.$watch("ir.OilTemp",function(i,n){if(!i||null==i)return void r.text("-");var t=_.split(i.toFixed(1),"."),e=_slicedToArray(t,2),a=e[0],s=e[1];r.html(a+"<sub>.</sub><sup>"+s+"</sup>")})}}}),app.directive("irdBoardsAmgGt3BrakeBias",function(){return{link:function(i,r,n){i.$watch("ir.dcBrakeBias",function(i,n){if(!i||null==i)return void r.text("-");var t=_.split(i.toFixed(1),"."),e=_slicedToArray(t,2),a=e[0],s=e[1];r.html(a+"<sub>.</sub><sup>"+s+"</sup>")})}}}),app.directive("irdBoardsAmgGt3Voltage",function(){return{link:function(i,r,n){i.$watch("ir.Voltage",function(i,n){if(!i||null==i)return void r.text("-");var t=_.split(i.toFixed(1),"."),e=_slicedToArray(t,2),a=e[0],s=e[1];r.html(a+"<sub>.</sub><sup>"+s+"</sup>")})}}}),app.directive("irdBoardsAmgGt3Tank",function(){return{link:function(i,r,n){i.$watch("ir.FuelLevel",function(i,n){if(!i||null==i||0>=i)return void r.text("-");var t=_.split(i.toFixed(1),"."),e=_slicedToArray(t,2),a=e[0],s=e[1];r.html(a+"<sub>.</sub><sup>"+s+"</sup>")})}}}),app.directive("irdBoardsAmgGt3Fuel",function(){return{link:function(i,r,n){i.$watch("ir.FuelLevel",function(i,n){return!i||null==i||0>=i?void r.text("-"):void r.text("-")})}}}),app.directive("irdBoardsAmgGt3Pit",function(){return{link:function(i,r,n){i.$watch("ir.FuelLevel",function(i,n){return!i||null==i||0>=i?void r.text("-"):void r.text("-")})}}}),app.directive("irdBoardsAmgGt3Take",function(){return{link:function(i,r,n){i.$watch("ir.FuelLevel",function(i,n){return!i||null==i||0>=i?void r.text("-"):void r.text("-")})}}}),app.directive("irdBoardsAmgGt3Lap",function(){return{link:function(i,r,n){i.$watchGroup(["ir.SessionInfo","ir.Lap","ir.SessionNum"],function(i,n){var t=_slicedToArray(i,3),e=t[0],a=t[1],s=t[2];if(!e||null==e||!a||null==a||null==s)return void r.text("-");var o="/",u=void 0;return"unlimited"==e.Sessions[s].SessionLaps?void r.html(a):("unlimited"!=e.Sessions[s].SessionLaps&&(u=e.Sessions[s].SessionLaps),void r.html(a+"<sub>"+o+"</sub><sup>"+u+"</sup>"))})}}}),app.directive("irdBoardsAmgGt3Pos",function(){return{link:function(i,r,n){i.$watch("ir.PlayerCarPosition",function(n,t){return n&&null!=n?void r.html(n+"<sub>/</sub><sup>"+i.drivers+"</sup>"):void r.text("-")})}}}),app.directive("irdBoardsAmgGt3Delta",function(){return{link:function(i,r,n){i.$watch("ir.LapDeltaToBestLap",function(i,n){return i&&null!=i?(i=i.toFixed(3),0>i?void r.html(i):i>0?void r.html("+"+i):void r.html("&plusmn;"+i)):void r.html("--")})}}}),app.directive("irdBoardsAmgGt3DeltaColor",function(){return{link:function(i,r,n){i.$watch("ir.LapDeltaToBestLap",function(i,n){if(i&&null!=i){if(0>i)return r.removeClass("fasslowerter"),void r.addClass("faster");if(i>0)return r.removeClass("faster"),void r.addClass("slower");r.removeClass("faster"),r.removeClass("slower")}})}}}),app.directive("irdBoardsAmgGt3RevShift",["Helpers","ShiftPoints",function(i,r){return{restrict:"ACE",link:function(i,n,t){i.$watchGroup(["ir.Gear","ir.RPM"],function(t,e){var a=_slicedToArray(t,2),s=a[0],o=a[1];if(s&&null!=s&&o&&null!=o){var u=r.forCarAndGear(i.carId,s)||i.blink;o>=u?"block"!=n.css("display")&&n.css("display","block"):"none"!=n.css("display")&&n.css("display","none")}})}}}]),app.directive("irdBoardsAmgGt3RevbarAmgGt3",["Helpers",function(i){return{restrict:"ACE",link:function(i,r,n){i.$watch("ir.RPM",function(n,t){if(n&&null!=n){var e=i.max,a=n;return a>=e?void r.css("width","100%"):a>0?void r.css("width",a/e*100+"%"):void r.css("width","0%")}})}}}]);
"use strict";var app=angular.module("ir.dashboards.mercedes_amg_gt3.filters",[]);
"use strict";var app=angular.module("ir.internal.dashboards.controllers",[]);app.controller("DashboardsCtrl",["$scope",function(r){}]);
"use strict";var app=angular.module("ir.internal.dashboards",["ir.internal.dashboards.controllers","ir.internal.dashboards.services"]);app.config(["$routeProvider",function(r){r.when("/config/dashboards",{templateUrl:"views/dashboards.html",controller:"DashboardsCtrl"})}]);
"use strict";var app=angular.module("ir.internal.dashboards.services",[]);app.service("Boards",[function(){return new window.Boards}]);
"use strict";var app=angular.module("ir.internal.iracing.controllers",[]);app.controller("iRacingCtrl",["$scope","Kutu","iRacing",function(t,n,i){t.kutu=n.get(),t.save=function(t){n.set(t),i.server=n.host,i.fps=n.fps,i.ibt=n.ibt,i.disconnect(),i.connect()}}]);
"use strict";var app=angular.module("ir.internal.iracing",["ir.internal.iracing.controllers","ir.internal.iracing.services"]);app.config(["$routeProvider",function(i){i.when("/config/iracing",{templateUrl:"views/iracing.html",controller:"iRacingCtrl"})}]);
"use strict";var app=angular.module("ir.internal.iracing.services",[]);app.service("Kutu",[function(){return new Kutu}]);
"use strict";var app=angular.module("ir.internal.shift_lights.controllers",[]);app.controller("ShiftLightsCtrl",["$scope",function(t){}]);
"use strict";var app=angular.module("ir.internal.shift_lights",["ir.internal.shift_lights.controllers","ir.internal.shift_lights.services"]);app.config(["$routeProvider",function(i){i.when("/config/shift-lights",{templateUrl:"views/shift_lights.html",controller:"ShiftLightsCtrl"})}]);
"use strict";var app=angular.module("ir.internal.shift_lights.services",[]);
"use strict";var app=angular.module("ir.internal.shift_points.controllers",[]);app.controller("ShiftPointsCtrl",["$scope","Cars","ShiftPoints",function(t,s,r){t.cars=s.get(),t.shifts=r.get(),t.carId=null,t.gears={},t.$watch("carId",function(s,r){return s?t.shifts.hasOwnProperty(s)?void(t.gears=t.shifts[s]):void(t.gears={}):void 0}),t.$watch("gears",function(s,r){return s&&_.keys(s).length&&_.sum(_.values(s))?void(t.shifts[t.carId]=s):void delete t.shifts[t.carId]},!0),t.save=function(t){r.set(t)}}]);
"use strict";var app=angular.module("ir.internal.shift_points",["ir.internal.shift_points.controllers","ir.internal.shift_points.services"]);app.config(["$routeProvider",function(i){i.when("/config/shift-points",{templateUrl:"views/shift_points.html",controller:"ShiftPointsCtrl"})}]);
"use strict";var app=angular.module("ir.internal.shift_points.services",[]);app.service("ShiftPoints",[function(){return new ShiftPoints}]);
"use strict";var app=angular.module("ir.internal.window.controllers",[]);app.controller("WindowCtrl",["$scope","Config",function(n,o){n.config=o.get(),n.window=o.win(),n.save=function(n){o.set(n)}}]);
"use strict";var app=angular.module("ir.internal.window",["ir.internal.window.controllers","ir.internal.window.services"]);app.config(["$routeProvider",function(n){n.when("/config/window",{templateUrl:"views/window.html",controller:"WindowCtrl"})}]);
"use strict";var app=angular.module("ir.internal.window.services",[]);app.service("Config",[function(){return new Config}]);