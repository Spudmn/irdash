'use strict'

const Shifts = function() {
    this.ipc  = require('electron').ipcRenderer
    this.load = true
    this.data = {}

    this.get()
}

Shifts.prototype.get = function() {
    if (this.load) {
        this.data = this.ipc.sendSync('getShifts')
        this.load = false
    }

    return this.data
}

Shifts.prototype.set = function(shifts) {
    this.load = true

    return this.ipc.sendSync('setShifts', shifts)
}

Shifts.prototype.forCarAndGear = function(carId, gear) {
    if (!this.data.hasOwnProperty(carId)) {
        return null
    }

    if (!this.data[carId].hasOwnProperty(gear)) {
        return null
    }

    return this.data[carId][gear]
}

window.Shifts = Shifts
