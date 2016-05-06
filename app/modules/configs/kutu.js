'use strict'

const Config   = require('../config')
const jsonfile = require('jsonfile')
const path     = require('path')
const fs       = require('fs')
const _        = require('lodash')

class Kutu extends Config {
    constructor(dir) {
        super(dir)

        this.path = path.join(this.dir, 'kutu.json')
    }

    get host() {
        return this.all().host
    }

    get fps() {
        return this.all().fps
    }

    get ibt() {
        return this.all().ibt
    }

    defaults() {
        return jsonfile.readFileSync(path.join(__dirname, '..', '..', 'configs', 'kutu.json'))
    }

    load() {
        try {
            return jsonfile.readFileSync(this.path)
        } catch (err) {
            return {}
        }
    }

    save(config) {
        jsonfile.writeFileSync(this.path, config)

        return true
    }

    watch() {
        fs.watchFile(this.path, (curr, prev) => {
            this.emit('change')
        })
    }
}

module.exports = Kutu
