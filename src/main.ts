import path from 'node:path'
import {BrowserWindow , app, ipcMain } from 'electron'

const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const Encoding = require('encoding-japanese');

const handleSetTitle =  (event: any, title: any) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win?.setTitle(title)
}

const handleExecCommand = async (event: any, cmd: string) => {
    try {
        const res = (await exec(cmd))
        console.log(res);
        return Encoding.convert(res.stdout, { from: 'SJIS', to: 'UNICODE', type: 'string' });
    } catch(eres: any) {
        console.log(eres)
        return Encoding.convert(eres.stderr, { from: 'SJIS', to: 'UNICODE', type: 'string' });
    }
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