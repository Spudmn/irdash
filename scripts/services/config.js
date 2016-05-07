const Config = (() => {
    const ipc = require('electron').ipcRenderer

    let loaded = false

    const loadConfig = function() {
        loaded = true

        return ipc.sendSync('getConfig')
    }

    const loadWindow = function() {
        return ipc.sendSync('getWindow')
    }

    const save = function(config) {
        loaded = false

        return ipc.sendSync('setConfig', config)
    }

    class Config {
        constructor() {
            this.data = loadConfig()
        }

        all() {
            if (!loaded) {
                this.data = loadConfig()
            }

            return this.data
        }

        save(config) {
            return save(config)
        }

        window() {
            return loadWindow()
        }
    }

    return Config
})()
