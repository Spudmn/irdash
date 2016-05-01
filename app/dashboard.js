'use strict'

const electron = require('electron')
const jsonfile = require('jsonfile')
const lodash = require('lodash')
const path = require('path')

const app = electron.app
const ipc = electron.ipcMain
const psb = require('electron').powerSaveBlocker;
const psbId = psb.start('prevent-display-sleep')

const BrowserWindow = electron.BrowserWindow

let config
let mainWindow

const defaults = jsonfile.readFileSync(path.join(__dirname, 'defaults.json'))
const configFile = path.join(app.getPath('userData'), 'config.json')

function loadConfig() {
    try {
        config = lodash.extend(defaults, jsonfile.readFileSync(configFile, {
            throws: false
        }))
    } catch (err) {
        config = defaults
    }

    createWindow(config)
}

ipc.on('getConfig', function(event) {
    event.returnValue = config
})

ipc.on('setConfig', function(event, newConfig) {
    config = lodash.extend(defaults, config, newConfig)
    jsonfile.writeFileSync(configFile, config)

    mainWindow.setMovable(!config.fixed)

    if (config.width && config.height) {
        mainWindow.setSize(config.width, config.height)
    }

    if (config.posX && config.posY) {
        mainWindow.setPosition(config.posX, config.posY)
    }

    event.returnValue = config
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

function createWindow(config) {
    // @todo work wirth electron.screen

    mainWindow = new BrowserWindow({
        width: config.debug ? 1440 : config.width || 800,
        height: config.debug ? 900 : config.height || 480,

        x: config.debug ? null : config.posX || null,
        y: config.debug ? null : config.posY || null,

        movable: config.debug ? true : !config.fixed,
        resizable: config.debug,
        minimizable: config.debug,
        maximizable: config.debug,
        alwaysOnTop: !config.debug,
        fullscreen: false,
        fullscreenable: false,
        title: 'iRacing Dashboard',
        frame: config.debug,
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

    mainWindow.loadURL('file://' + __dirname + '/dashboard.html')

    if (config.debug) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', loadConfig)

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
