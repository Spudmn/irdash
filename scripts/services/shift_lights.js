const ShiftLights = (() => {
    const ipc = require('electron').ipcRenderer

    let loaded = false

    class ShiftLights {
        constructor() {
            this.data = {}
        }
    }

    return ShiftLights
})()
