'use strict'

const _ = require('lodash')

const Cars = require('./configs/cars')
const Kutu = require('./configs/kutu')
const ShiftLights = require('./configs/shift-lights')
const ShiftPoints = require('./configs/shift-points')
const Window = require('./configs/window')

class Configs {
    constructor(dir) {
        this.cars = new Cars(dir)
        this.kutu = new Kutu(dir)
        this.shiftLights = new ShiftLights(dir)
        this.shiftPoints = new ShiftPoints(dir)
        this.window = new Window(dir)
    }

    watch() {
        _.each(this, function(config) {
            config.watch()
        })
    }
}

module.exports = Configs
