const Cars = (() => {
    const ipc = require('electron').ipcRenderer

    let loaded = false

    const load = function() {
        loaded = true

        return ipc.sendSync('getCars')
    }

    class Cars {
        constructor() {
            this.data = load()
        }

        all() {
            if (!loaded) {
                this.data = load()
            }

            return this.data
        }
    }

    return Cars
})()
