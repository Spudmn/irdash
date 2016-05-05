'use strict'

const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class ShiftPoints {
    constructor(app, ipc) {
        this.path     = path.join(app.getPath('userData'), 'shift_points.json')
        this.defaults = {}

        ipc.on('getShiftPoints', (event) => {
            event.returnValue = this.load()
        })

        ipc.on('setShiftPoints', (event, config) => {
            event.returnValue = this.save(config).load()
        })
    }

    load() {
        try {
            return _.extend(this.defaults, jsonfile.readFileSync(this.path))
        } catch(err) {
            return this.defaults
        }
    }

    save(config) {
        jsonfile.writeFileSync(this.path, config)

        return this
    }
}

module.exports = ShiftPoints
