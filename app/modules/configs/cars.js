'use strict'

const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class Cars {
    constructor(app, ipc) {
        this.cars = jsonfile.readFileSync(path.join(__dirname, '..', '..', 'configs', 'cars.json'))

        ipc.on('getCars', (event) => {
            event.returnValue = this.cars
        })
    }
}

module.exports = Cars
