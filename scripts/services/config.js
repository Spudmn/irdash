'use strict'

const Config = function() {
    this.ipc = require('electron').ipcRenderer
}

Config.prototype.get = function() {
    return this.ipc.sendSync('getConfig')
}

Config.prototype.set = function(config) {
    return this.ipc.sendSync('setConfig', config)
}

Config.prototype.win = function() {
    return this.ipc.sendSync('getWindow')
}

window.Config = Config
