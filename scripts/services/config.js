'use strict'

const electron = require('electron')

const Config = function() {
    this.ipc  = electron.ipcRenderer
    this.load = true
    this.data = {}

    this.get()
}

Config.prototype.get = function() {
    if (this.load) {
        this.data = this.ipc.sendSync('getConfig')
        this.load = false
    }

    return this.data
}

Config.prototype.set = function(config) {
    this.load = true

    return this.ipc.sendSync('setConfig', config)
}

Config.prototype.win = function() {
    return this.ipc.sendSync('getWindow')
}

window.Config = Config
