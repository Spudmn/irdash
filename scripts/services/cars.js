class Cars {
    constructor() {
        this.ipc = require('electron').ipcRenderer
        this.load = true
        this.data = {}

        this.get()
    }

    get() {
        if (this.load) {
            this.data = this.ipc.sendSync('getCars')
            this.load = false
        }

        return this.data
    }
}
