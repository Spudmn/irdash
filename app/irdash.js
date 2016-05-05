'use strict'

const electron = require('electron')
const jsonfile = require('jsonfile')
const path = require('path')
const _ = require('lodash')

jsonfile.spaces = 2

const app = electron.app
const ipc = electron.ipcMain
const psb = require('electron').powerSaveBlocker;
const psbId = psb.start('prevent-display-sleep')

const Migrations = require('./modules/migrations')
Migrations.run(app)

const Configs = require('./modules/configs')
const configs = new Configs(app, ipc)

let debug = configs.window.debug,
    mainWindow

const BrowserWindow = electron.BrowserWindow

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

    mainWindow.loadURL('file://' + __dirname + '/irdash.html')

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
