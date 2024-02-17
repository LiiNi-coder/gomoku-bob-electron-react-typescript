// See the Electron documentation for details on how to use preload scripts:

import { contextBridge } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
interface Window {
    ipcRenderer: any;
}

const { ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: ipcRenderer
})