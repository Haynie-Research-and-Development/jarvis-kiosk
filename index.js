const { app, BrowserWindow, dialog, shell } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os')

var browserWindow

function createWindow () {
  browserWindow = new BrowserWindow({
    height: 480,
    kiosk: true,
    title: 'Jarvis Kiosk',
    titleBarStyle: 'hidden',
    width: 800
  })

  browserWindow.url = 'http://localhost:8123'
  browserWindow.os = os.platform()
  browserWindow.password = ''
  browserWindow.notifications = true
  browserWindow.save_dimensions = false

  load('index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow()
  }
})

function load (html) {
  browserWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src', html),
    protocol: 'file:',
    slashes: true
  }))
}

function setPage (page) {
  browserWindow.webContents.send('change', { page })
}
