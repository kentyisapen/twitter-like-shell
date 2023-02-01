const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	execCommand: (text: any) => ipcRenderer.invoke("execCommand", text),
	detectOs: () => ipcRenderer.invoke("detectOs"),
});

console.log("preloaded");
