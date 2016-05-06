'use strict'

const Config   = require('../config')
const jsonfile = require('jsonfile')
const path     = require('path')
const fs       = require('fs')
const _        = require('lodash')

class ShiftPoints extends Config {
    constructor(dir) {
        super(dir)

        this.path = path.join(this.dir, 'shift_points.json')
    }

    load() {
        try {
            return jsonfile.readFileSync(this.path)
        } catch(err) {
            return {}
        }
    }

    save(config) {
        try {
            jsonfile.writeFileSync(this.path, config)
        } catch (err) {
            return false
        }

        return true
    }

    watch() {
        fs.watchFile(this.path, (curr, prev) => {
            this.emit('change')
        })
    }
}

module.exports = ShiftPoints
