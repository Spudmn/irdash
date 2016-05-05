'use strict'

const Cars = require('./configs/cars')
const Kutu = require('./configs/kutu')
const ShiftLights = require('./configs/shift-lights')
const ShiftPoints = require('./configs/shift-points')
const Window = require('./configs/window')

class Configs {
    constructor(app, ipc) {
        this.cars = new Cars(app, ipc)
        this.kutu = new Kutu(app, ipc)
        this.shiftLights = new ShiftLights(app, ipc)
        this.shiftPoints = new ShiftPoints(app, ipc)
        this.window = new Window(app, ipc)
    }
}

module.exports = Configs
