'use strict'

const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class Window {
    constructor(app, ipc) {
        this.defaults = jsonfile.readFileSync(path.join(__dirname, '..', '..', 'configs', 'window.json'))
        this.path     = path.join(app.getPath('userData'), 'window.json')

        ipc.on('getConfig', (event) => {
            event.returnValue = this.load()
        })

        ipc.on('setConfig', (event, config) => {
            event.returnValue = this.save(config).load()
        })

        /*
        ipc.on('setConfig', function(event, newConfig) {
            config = _.extend(defaults, config, newConfig)
            jsonfile.writeFileSync(configFile, config)

            mainWindow.setMovable(!config.fixed)

            if (!debug) {
                if (config.width && config.height) {
                    mainWindow.setSize(config.width, config.height)
                }

                if (config.posX && config.posY) {
                    mainWindow.setPosition(config.posX, config.posY)
                }configs.window.
            }

            event.returnValue = config
        })

        */
    }

    get height() {
        return this.load().height
    }


    get width() {
        return this.load().width
    }


    get posX() {
        return this.load().posX
    }


    get posY() {
        return this.load().posY
    }

    get fixed() {
        return this.load().fixed
    }

    get debug() {
        return this.load().debug
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

module.exports = Window
