// m5n 관련 모듈
//import {ipcRenderer} from "electron";
const { ipcRenderer } = window.require("electron");
export default class M5nControler{
    constructor(isLocalServer=true){
    }
    
    async start(){
        return await ipcRenderer.sendSync("startSync", "fromRender");
    }
}