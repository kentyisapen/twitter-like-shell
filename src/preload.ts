const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title:any) => ipcRenderer.send('set-title', title),
    execCommand: (text: any) => ipcRenderer.invoke('execCommand', text)
})

console.log('preloaded')