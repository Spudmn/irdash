'use strict'

const electron = require('electron')
const app = electron.app

const squirrel = require('./modules/squirrel')
if (squirrel.handleSquirrelEvent(app)) {
    return
}

const jsonfile = require('jsonfile')
jsonfile.spaces = 4

require('./modules/migrations').run(app)

const Configs = require('./modules/configs')
const configs = new Configs(app.getPath('userData'))

/*
configs.shiftPoints.on('change', function() {})
configs.kutu.on('change', function() {})
configs.window.on('change', function() {})
configs.watch()
*/

let mainWindow

const shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore()
        }

        mainWindow.show()
        mainWindow.focus()
    }

    return true
})

if (shouldQuit) {
    app.quit()
    return
}

const debug = configs.window.debug
const ipc = electron.ipcMain

ipc.on('getCars', (event) => {
    event.returnValue = configs.cars.all()
})

ipc.on('getKutu', (event) => {
    event.returnValue = configs.kutu.all()
})
ipc.on('setKutu', (event, config) => {
    event.returnValue = configs.kutu.save(config)
})

ipc.on('getShiftPoints', (event) => {
    event.returnValue = configs.shiftPoints.all()
})
ipc.on('setShiftPoints', (event, config) => {
    event.returnValue = configs.shiftPoints.save(config)
})

ipc.on('getConfig', (event) => {
    event.returnValue = configs.window.all()
})
ipc.on('setConfig', function(event, config) {
    event.returnValue = configs.window.save(config)

    mainWindow.setMovable(!config.fixed)

    if (!debug) {
        if (config.width && config.height) {
            mainWindow.setSize(config.width, config.height)
        }

        if (config.posX && config.posY) {
            mainWindow.setPosition(config.posX, config.posY)
        }
    }
})

ipc.on('getWindow', function(event) {
    let size = mainWindow.getSize(),
        pos = mainWindow.getPosition()

    event.returnValue = {
        width: size[0],
        height: size[1],
        posX: pos[0],
        posY: pos[1]
    }
})

const psb = require('electron').powerSaveBlocker;
const psbId = psb.start('prevent-display-sleep')

const BrowserWindow = electron.BrowserWindow

function createWindow() {
    // @todo work wirth electron.screen

    mainWindow = new BrowserWindow({
        width: debug ? 1440 : configs.window.width || 800,
        height: debug ? 900 : configs.window.height || 480,

        x: debug ? null : configs.window.posX || null,
        y: debug ? null : configs.window.posY || null,

        movable: debug ? true : !configs.window.fixed,
        resizable: debug,
        minimizable: debug,
        maximizable: debug,
        alwaysOnTop: !debug,
        fullscreen: false,
        fullscreenable: false,
        title: 'iRacing Dashboard',
        frame: debug,
        hasShadow: false,
        type: 'splash',
        webPreferences: {
            images: false,
            textAreasAreResizable: false,
            webgl: false,
            webaudio: false,
            defaultFontFamily: 'sansSerif',
            defaultEncoding: 'UTF-8',
            backgroundThrottling: false
        }
    });

    mainWindow.loadURL(`file://${__dirname}/irdash.html`)

    if (debug) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (psb.isStarted(psbId)) {
        psb.stop(psbId)
    }

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
});
