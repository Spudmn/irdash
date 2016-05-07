const Kutu = (() => {
    const ipc = require('electron').ipcRenderer

    let loaded = false

    const load = function() {
        loaded = true
        
        return ipc.sendSync('getKutu')
    }

    const save = function(config) {
        loaded = false

        return ipc.sendSync('setKutu', config)
    }

    class Kutu {
        constructor() {
            this.data = load()
        }

        all() {
            if (!loaded) {
                this.data = load()
                loaded = true
            }

            return this.data
        }

        get host() {
            return this.data.host
        }

        get fps() {
            return this.data.fps
        }

        get ibt() {
            return this.data.ibt
        }

        save(config) {
            return save(config)
        }
    }

    return Kutu
})()
