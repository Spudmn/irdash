'use strict'

const Shifts = function() {
    this.ipc = require('electron').ipcRenderer
}

Shifts.prototype.get = function() {
    return this.ipc.sendSync('getShifts')
}

Shifts.prototype.set = function(shifts) {
    return this.ipc.sendSync('setShifts', shifts)
}

window.Shifts = Shifts
