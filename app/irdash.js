'use strict'

const electron = require('electron')
const app = electron.app

const squirrel = require('./modules/squirrel')
if (squirrel.handleSquirrelEvent(app)) {
    return
}

require('crash-reporter').start({
    productName: 'iRacing Dashboard',
    companyName: 'Pierre Minnieur',
    submitURL: 'https://irdash.ferm.io/crash-report',
    autoSubmit: true
})

const jsonfile = require('jsonfile')
jsonfile.spaces = 4

require('./modules/migrations').run(app)

const Configs = require('./modules/configs')
const configs = new Configs(app.getPath('userData'))

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

    mainWindow.loadURL(`http://localhost:3000/irdash.html`)

    if (debug) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

const iRacing = require('./modules/iracing')
const WebServer = require('./modules/webserver')
const WebSocket = require('./modules/websocket')

const ir = new iRacing()
ir.connect()

const web = new WebServer(__dirname)

web.app.get('/api/cars', (req, res, next) => {
    res.json(configs.cars.all())
})
web.app.get('/api/config', (req, res, next) => {
    res.json(configs.window.all())
})
web.app.post('/api/config', (req, res, next) => {
    configs.window.save(req.body)
    res.json(configs.window.all())
})
web.app.get('/api/kutu', (req, res, next) => {
    res.json(configs.kutu.all())
})
web.app.post('/api/kutu', (req, res, next) => {
    configs.kutu.save(req.body)
    res.json(configs.kutu.all())
})
web.app.get('/api/shift-points', (req, res, next) => {
    res.json(configs.shiftPoints.all())
})
web.app.post('/api/shift-points', (req, res, next) => {
    configs.shiftPoints.save(req.body)
    res.json(configs.shiftPoints.all())
})

web.listen(3000)

const ws = new WebSocket(web.http)
ws.start()

ws.on('connect', (con) => {
    console.log('ws/ir:connect')

    // pipes kutu to electron window
    const listener = function(json) {
        console.log('ws/ir:message')
        con.sendUTF(JSON.stringify(json))
    }

    ir.on('message', listener)

    con.on('close', () => {
        console.log('ws/ir:detached')
        ir.removeListener('message', listener)
    })
})

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
