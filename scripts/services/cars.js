'use strict'

const Cars = function() {
    this.ipc = require('electron').ipcRenderer
}

Cars.prototype.get = function() {
    return this.ipc.sendSync('getCars')
}

window.Cars = Cars
