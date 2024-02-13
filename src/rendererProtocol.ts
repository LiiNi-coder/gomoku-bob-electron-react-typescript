// m5n 관련 모듈
//import {ipcRenderer} from "electron";
export default class M5nControler{
    temp;
    constructor(isLocalServer=true){
        const {ipcRenderer} = require("electron");
        this.temp = ipcRenderer;
    }
    
    async start(){
        
        await this.temp.sendSync("startSync", "fromRender");
    }
}