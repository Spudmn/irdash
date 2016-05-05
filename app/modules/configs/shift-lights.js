'use strict'

const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class ShiftLights {
    constructor(app, ipc) {
        this.path     = path.join(app.getPath('userData'), 'shift_lights.json')
        this.defaults = {}

        ipc.on('getShiftLights', (event) => {
            event.returnValue = this.load()
        })

        ipc.on('setShiftLights', (event, config) => {
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

module.exports = ShiftLights
