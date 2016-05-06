'use strict'

const Config   = require('../config')
const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class Cars extends Config {
    constructor(dir) {
        super(dir)

        this.path = path.join(__dirname, '..', '..', 'configs', 'cars.json')
    }

    defaults() {
        return jsonfile.readFileSync(this.path)
    }
}

module.exports = Cars
