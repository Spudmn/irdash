"use strict";!function(r){var e=r.module("irdApp",["ngRoute","irdControllers","irdDirectives","irdServices","irdFilters"]);e.config(["$routeProvider","$locationProvider",function(r,e){r.when("/config",{templateUrl:"views/config.html",controller:"irdConfigCtrl"}).when("/boards",{templateUrl:"views/boards.html",controller:"irdBoardsCtrl"}).when("/boards/amggt3",{templateUrl:"views/boards/amggt3.html",controller:"irdAmgGt3Ctrl"}).when("/boards/renault",{templateUrl:"views/boards/renault.html",controller:"irdRenaultCtrl"}).otherwise({redirectTo:"/boards"})}])}(angular);
"use strict";var WATER_TEMP_WARNING=1,FUEL_PRESSURE_WARNING=2,OIL_PRESSURE_WARNING=4,ENGINE_STALLED=8,PIT_SPEED_LIMITER=16,REV_LIMITER_ACTIVE=32,CHECKERED=1,WHITE=2,GREEN=4,YELLOW=8,RED=16,BLUE=32,DEBRIS=64,CROSSED=128,YELLOW_WAVING=256,ONE_LAP_TO_GREEN=512,GREEN_HELD=1024,TEN_TO_GO=2048,FIVE_TO_GO=4096,RANDOM_WAVING=8192,CAUTION=16384,CAUTION_WAVING=32768,BLACK=65536,DISQUALIFY=131072,SERVICIBLE=262144,FURLED=524288,REPAIR=1048576,START_HIDDEN=268435456,START_READY=536870912,START_SET=1073741824,START_GO=2147483648,NOT_IN_WORLD=-1,OFF_TRACK=0,IN_PIT_STALL=1,APROACHING_PITS=2,ON_TRACK=3,SESSION_STATE_INVALID=0,SESSION_STATE_GET_IN_CAR=1,SESSION_STATE_WARMUP=2,SESSION_STATE_PARADE_LAPS=3,SESSION_STATE_RACING=4,SESSION_STATE_CHECKERED=5,SESSION_STATE_COOL_DOWN=6;
"use strict";!function(r){var i=r.module("irdControllers",[]);i.controller("irdCtrl",["$scope","$location",function(r,i){r.config=function(r,n){r.ctrlKey&&"Comma"==r.code&&i.path("/config")}}]),i.controller("irdBoardsCtrl",["$scope","$location","$route",function(r,i,n){}]),i.controller("irdConfigCtrl",["$scope","Config",function(r,i){r.config=i.get(),r.window=i.win(),r.save=function(n){r.config=i.set(n)}}]),i.controller("irdBaseCtrl",["$scope","iRacing","Helpers",function(r,i,n){r.ir=i.data,r.revs=[],r.blink=0,r.shift=0,r.max=0,r.last=0,r.idle=0,r.drivers=0,r.$watch("ir.DriverInfo",function(i,o){i&&null!=i&&(r.revs=n.numRevs(i.DriverCarRedLine),r.blink=i.DriverCarSLBlinkRPM,r.shift=i.DriverCarSLShiftRPM,r.last=i.DriverCarSLLastRPM,r.idle=i.DriverCarIdleRPM,r.max=i.DriverCarRedLine,r.drivers=i.Drivers.length)})}]),i.controller("irdAmgGt3Ctrl",["$scope",function(r){}]),i.controller("irdRenaultCtrl",["$scope",function(r){}])}(angular);
"use strict";!function(i){var n=i.module("irdDirectives",[]);n.directive("irdBack",["$window",function(i){return{link:function(n,t,r){t.on("click",function(){i.history.back()})}}}]),n.directive("irdFuelPressWarn",function(){return{link:function(i,n,t){i.$watch("ir.EngineWarnings",function(i,t){i&FUEL_PRESSURE_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}),n.directive("irdWaterTempWarn",function(){return{link:function(i,n,t){i.$watch("ir.EngineWarnings",function(i,t){i&WATER_TEMP_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}),n.directive("irdWaterTemp",function(){return{link:function(i,n,t){i.$watch("ir.WaterTemp",function(i,t){if(!i||null==i)return void n.text("-");var r=_.split(i.toFixed(1),".");n.html(r[0]+"<sub>.</sub><sup>"+r[1]+"</sup>")})}}}),n.directive("irdOilPressWarn",function(){return{link:function(i,n,t){i.$watch("ir.EngineWarnings",function(i,t){i&OIL_PRESSURE_WARNING?n.addClass("warning"):n.removeClass("warning")})}}}),n.directive("irdOilTemp",function(){return{link:function(i,n,t){i.$watch("ir.OilTemp",function(i,t){if(!i||null==i)return void n.text("-");var r=_.split(i.toFixed(1),".");n.html(r[0]+"<sub>.</sub><sup>"+r[1]+"</sup>")})}}}),n.directive("irdBrakeBias",function(){return{link:function(i,n,t){i.$watch("ir.dcBrakeBias",function(i,t){if(!i||null==i)return void n.text("-");var r=_.split(i.toFixed(1),".");n.html(r[0]+"<sub>.</sub><sup>"+r[1]+"</sup>")})}}}),n.directive("irdVoltage",function(){return{link:function(i,n,t){i.$watch("ir.Voltage",function(i,t){if(!i||null==i)return void n.text("-");var r=_.split(i.toFixed(1),".");n.html(r[0]+"<sub>.</sub><sup>"+r[1]+"</sup>")})}}}),n.directive("irdTank",function(){return{link:function(i,n,t){i.$watch("ir.FuelLevel",function(i,t){if(!i||null==i||0>=i)return void n.text("-");var r=_.split(i.toFixed(1),".");n.html(r[0]+"<sub>.</sub><sup>"+r[1]+"</sup>")})}}}),n.directive("irdFuel",function(){return{link:function(i,n,t){i.$watch("ir.FuelLevel",function(i,t){return!i||null==i||0>=i?void n.text("-"):void n.text("-")})}}}),n.directive("irdPit",function(){return{link:function(i,n,t){i.$watch("ir.FuelLevel",function(i,t){return!i||null==i||0>=i?void n.text("-"):void n.text("-")})}}}),n.directive("irdTake",function(){return{link:function(i,n,t){i.$watch("ir.FuelLevel",function(i,t){return!i||null==i||0>=i?void n.text("-"):void n.text("-")})}}}),n.directive("irdLap",function(){return{link:function(i,n,t){i.$watchGroup(["ir.SessionInfo","ir.Lap","ir.SessionNum"],function(i,t){var r=i[0],e=i[1],s=i[2];if(!r||null==r||!e||null==e||null==s)return void n.text("-");var u=void 0,l="/";return"unlimited"==r.Sessions[s].SessionLaps?void n.html(e):("unlimited"!=r.Sessions[s].SessionLaps&&(u=r.Sessions[s].SessionLaps),void n.html(e+"<sub>"+l+"</sub><sup>"+u+"</sup>"))})}}}),n.directive("irdPos",function(){return{link:function(i,n,t){i.$watch("ir.PlayerCarPosition",function(t,r){return t&&null!=t?void n.html(t+"<sub>/</sub><sup>"+i.drivers+"</sup>"):void n.text("-")})}}}),n.directive("irdDelta",function(){return{link:function(i,n,t){i.$watch("ir.LapDeltaToBestLap",function(i,t){return i&&null!=i?(i=i.toFixed(3),0>i?void n.html(i):i>0?void n.html("+"+i):void n.html("&plusmn;"+i)):void n.html("--")})}}}),n.directive("irdDeltaColor",function(){return{link:function(i,n,t){i.$watch("ir.LapDeltaToBestLap",function(i,t){if(i&&null!=i){if(0>i)return n.removeClass("fasslowerter"),void n.addClass("faster");if(i>0)return n.removeClass("faster"),void n.addClass("slower");n.removeClass("faster"),n.removeClass("slower")}})}}}),n.directive("irdRevbarRenault",["Helpers",function(n){return{restrict:"AEC",link:function(n,t,r){var e=t.children().children(),s=100/e.length;n.$watch("ir.RPM",function(r,u){if(r&&null!=r){var l=n.last,o=n.shift,c=n.idle,a=r;if(a>=o){if(!t.hasClass("shift"))return void t.addClass("shift")}else t.hasClass("shift")&&t.removeClass("shift");var d=(a-c)/(l-c)*100;i.forEach(e,function(n,t){d>=s*t?i.element(n).css("visibility","visible"):i.element(n).css("visibility","hidden")})}})}}}]),n.directive("irdRevbarAmgGt3",["Helpers",function(i){return{restrict:"AEC",link:function(i,n,t){i.$watch("ir.RPM",function(t,r){if(t&&null!=t){var e=(i.revs,i.max),s=t;return s>=e?void n.css("width","100%"):s?void n.css("width",s/e*100+"%"):void n.css("width","0%")}})}}}]),n.directive("irdMarkers",[function(){return{restrict:"AEC",templateUrl:"views/marker.html"}}]),n.directive("irdRevPit",["Helpers",function(i){return{restrict:"AEC",link:function(i,n,t){i.$watch("ir.EngineWarnings",function(i,t){return i&PIT_SPEED_LIMITER?void("block"!=n.css("display")&&(n.css("display","block"),n.addClass("blink"))):void("none"!=n.css("display")&&(n.removeClass("blink"),n.css("display","none")))})}}}]),n.directive("irdRevShift",["Helpers",function(i){return{restrict:"AEC",link:function(i,n,t){i.$watch("ir.RPM",function(t,r){if(t&&null!=t){var e=i.blink,s=t;s>=e?"block"!=n.css("display")&&n.css("display","block"):"none"!=n.css("display")&&n.css("display","none")}})}}}])}(angular);
"use strict";!function(e,n){var t=e.module("irdFilters",[]);t.filter("lapTime",["Helpers",function(e){return function(t){if(null==t||"undefined"==typeof t||0>=t)return"--";var r=parseInt(t/60),u=parseInt(t)-60*r,i=parseInt(n.split(t.toFixed(9>r?3:2),".")[1]);return r+":"+e.leftPad(u,"00")+"."+e.leftPad(i,"000")}}]),t.filter("fixed",[function(){return function(e,n){return null==e||"undefined"==typeof e?"-":e.toFixed(n||0)}}]),t.filter("speed",[function(){return function(e){return null==e||"undefined"==typeof e?"-":(3.6*e).toFixed(0)}}]),t.filter("gear",[function(){return function(e){return null==e||"undefined"==typeof e?"-":0==e?"N":-1==e?"R":e}}])}(angular,_);
"use strict";!function(n,e,t){var r=e.module("irdServices",[]);r.service("Config",[function(){return new n.Config}]),r.service("iRacing",["$rootScope","Helpers",function(e,t){var r=new n.IRacing(["DriverInfo","SessionInfo","WeekendInfo","__all_telemetry__"],[],60);return r.onWSConnect=function(){return e.wsConnected=!0,e.$apply()},r.onWSDisconnect=function(){return e.wsConnected=!1,e.$apply()},r.onConnect=function(){return e.connected=!0,e.$apply()},r.onDisconnect=function(){return e.connected=!1,e.$apply()},r.onUpdate=function(n){return n.indexOf("DriverInfo")>=0,n.indexOf("SessionInfo")>=0,n.indexOf("WeekendInfo")>=0,e.$apply()},r}]),r.service("Helpers",[function(){return{formatLapTime:function(n){if(null==n||0>=n)return"--";var e=parseInt(n/60),r=parseInt(n)-60*e,i=parseInt(t.split(n.toFixed(10>e?3:2),".")[1]);return e+":"+this.leftPad(r,"00")+"."+this.leftPad(i,"000")},leftPad:function(n,e){return n=n.toString(),e.substring(0,e.length-n.length)+n},numRevs:function(n){return t.range(0,this.highestRev(n))},highestRev:function(n){return Math.ceil(n/1e3).toFixed(0)}}}])}(window,angular,_);
"use strict";var Config=function(){this.ipc=require("electron").ipcRenderer};Config.prototype.get=function(){return this.ipc.sendSync("getConfig")},Config.prototype.set=function(n){return this.ipc.sendSync("setConfig",n)},Config.prototype.win=function(){return this.ipc.sendSync("getWindow")},window.Config=Config;
"use strict";var IRacing,slice=[].slice;window.IRacing=IRacing=function(){function n(n,t,e,s,o,i){this.requestParams=null!=n?n:[],this.requestParamsOnce=null!=t?t:[],this.fps=null!=e?e:1,this.server=null!=s?s:"127.0.0.1:8182",this.readIbt=null!=o?o:!1,this.record=null!=i?i:null,this.data={},this.onConnect=null,this.onDisconnect=null,this.onUpdate=null,this.ws=null,this.onWSConnect=null,this.onWSDisconnect=null,this.reconnectTimeout=null,this.connected=!1,this.firstTimeConnect=!0,"undefined"!=typeof record&&null!==record?this.loadRecord():this.connect()}return n.prototype.connect=function(){return this.ws=new WebSocket("ws://"+this.server+"/ws"),this.ws.onopen=function(n){return function(){return n.onopen.apply(n,arguments)}}(this),this.ws.onmessage=function(n){return function(){return n.onmessage.apply(n,arguments)}}(this),this.ws.onclose=function(n){return function(){return n.onclose.apply(n,arguments)}}(this)},n.prototype.onopen=function(){var n;"function"==typeof this.onWSConnect&&this.onWSConnect(),null!=this.reconnectTimeout&&clearTimeout(this.reconnectTimeout);for(n in this.data)delete this.data[n];return this.ws.send(JSON.stringify({fps:this.fps,readIbt:this.readIbt,requestParams:this.requestParams,requestParamsOnce:this.requestParamsOnce}))},n.prototype.onmessage=function(n){var t,e,s,o,i;if(t=JSON.parse(n.data.replace(/\bNaN\b/g,"null")),t.disconnected&&(this.connected=!1,this.onDisconnect&&this.onDisconnect()),t.connected)for(e in this.data)delete this.data[e];if((t.connected||this.firstTimeConnect&&!this.connected)&&(this.firstTimeConnect=!1,this.connected=!0,this.onConnect&&this.onConnect()),t.data){s=[],o=t.data;for(e in o)i=o[e],s.push(e),this.data[e]=i;if(this.onUpdate)return this.onUpdate(s)}},n.prototype.onclose=function(){return"function"==typeof this.onWSDisconnect&&this.onWSDisconnect(),this.ws&&(this.ws.onopen=this.ws.onmessage=this.ws.onclose=null),this.connected&&(this.connected=!1,this.onDisconnect&&this.onDisconnect()),this.reconnectTimeout=setTimeout(function(n){return function(){return n.connect.apply(n)}}(this),2e3)},n.prototype.sendCommand=function(){var n,t;return t=arguments[0],n=2<=arguments.length?slice.call(arguments,1):[],this.ws.send(JSON.stringify({command:t,args:n}))},n.prototype.loadRecord=function(){var n;return n=new XMLHttpRequest,n.onreadystatechange=function(){var t;return 4===n.readyState&&200===n.status?(t=JSON.parse(n.responseText),console.log(t)):void 0},n.open("GET",this.record,!0),n.send()},n}();