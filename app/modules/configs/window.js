'use strict'

const Config   = require('../config')
const jsonfile = require('jsonfile')
const path     = require('path')
const fs       = require('fs')
const _        = require('lodash')

class Window extends Config {
    constructor(dir) {
        super(dir)

        this.path = path.join(this.dir, 'window.json')
    }

    get height() {
        return this.all().height
    }

    get width() {
        return this.all().width
    }

    get posX() {
        return this.all().posX
    }

    get posY() {
        return this.all().posY
    }

    get fixed() {
        return this.all().fixed
    }

    get debug() {
        return this.all().debug
    }

    defaults() {
        return jsonfile.readFileSync(path.join(__dirname, '..', '..', 'configs', 'window.json'))
    }

    load() {
        try {
            return jsonfile.readFileSync(this.path)
        } catch (err) {
            return {}
        }
    }

    save(config) {
        console.log(config)
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

module.exports = Window
