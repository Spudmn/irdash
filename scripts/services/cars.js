'use strict'

const Cars = function() {
    this.ipc = require('electron').ipcRenderer
    this.load = true
    this.data = {}

    this.get()
}

Cars.prototype.get = function() {
    if (this.load) {
        this.data = this.ipc.sendSync('getCars')
        this.load = false
    }

    return this.data
}

window.Cars = Cars
