'use strict'

const electron = require('electron')
const jsonfile = require('jsonfile')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let config
let mainWindow

function loadConfig() {
    const defaults = jsonfile.readFileSync(path.join(__dirname, 'defaults.json'))
    const configFile = path.join(app.getPath('userData'), 'config.json')

    try {
        config = jsonfile.readFileSync(configFile, { throws: false })
    } catch (err) {
        config = defaults
    }

    createWindow(config)
}

function createWindow(config) {
    mainWindow = new BrowserWindow({
        width: config.debug ? 1440 : config.width || 800,
        height: config.debug ? 900 : config.height || 480,

        x: config.debug ? null : config.posX || null,
        y: config.debug ? null : config.posY || null,

        movable: config.debug,
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
    });
}

app.on('ready', loadConfig)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
});
