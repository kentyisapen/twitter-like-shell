import path from 'node:path'
import {BrowserWindow , app, ipcMain } from 'electron'

const handleSetTitle =  (event: any, title: any) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win?.setTitle(title)
}

const handleExecCommand = (event: any, cmd: string) => {
    return cmd
}

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.handle('set-title', handleSetTitle)
    ipcMain.handle('execCommand', handleExecCommand)

    mainWindow.loadFile('dist/index.html')
})

app.once('window-all-closed', () => app.quit )