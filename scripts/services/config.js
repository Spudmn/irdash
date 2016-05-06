class Config {
    constructor() { // @todo inject electron
        this.ipc = require('electron').ipcRenderer
        this.load = true
        this.data = {}
    }

    get() {
        if (this.load) {
            this.data = this.ipc.sendSync('getConfig')
            this.load = false
        }

        return this.data
    }

    set(config) {
        this.load = true

        return this.ipc.sendSync('setConfig', config)
    }

    win() {
        return this.ipc.sendSync('getWindow')
    }
}
