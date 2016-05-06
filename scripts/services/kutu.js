class Kutu {
    constructor() {
        this.ipc  = require('electron').ipcRenderer
        this.load = true
        this.data = {}
    }

    get() {
        if (this.load) {
            this.data = this.ipc.sendSync('getKutu')
            this.load = false
        }

        return this.data
    }

    get host() {
        return this.get().host
    }

    get fps() {
        return this.get().fps
    }

    get ibt() {
        return this.get().ibt
    }

    set(kutu) {
        this.load = true

        return this.ipc.sendSync('setKutu', kutu)
    }

}
