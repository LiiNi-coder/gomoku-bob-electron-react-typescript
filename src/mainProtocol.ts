const path = require('path');
const url = require('url');
import { spawn } from "child_process";
import { BrowserWindow, ipcMain } from "electron";
import { Channel, Process, ReplyCode } from "./protocol";
const iconv = require("iconv-lite");
require('dotenv').config();

function m5nStart(mainWindow:BrowserWindow){
    //const spawn = require('child_process').spawn;
    const [server_ip, port, cwd] = [process.env.SERVER_IP, process.env.PORT, process.env.M5N_CWD];
    console.log(`[CWD]${cwd}`);
    const child = spawn("M5N.Slave",
        [`${server_ip}:${port}`, `./app`],
        {
            //detached:true,
            cwd:cwd,
            shell:true,
            //TEST
            timeout:30000,
        }
        );
    child.stdout.on("data", (data)=>{
        console.log(typeof data);
        console.log(`[STDOUT]${data.toString()}`);
        let temp = data.toString().indexOf("[place_stone]");
        console.log(temp);
        if(temp){
            child.stdin.write("1,1\n");
            //TODO
        }
        //console.log(`[STDOUT]:${iconv.decode(data, "euc-kr")}`);
        //console.log(`[STDOUT]:${data.toString("hex")}`);ffjrtl 
    });
    child.stderr.on("data", (data)=>{
        console.log(`[STDERR]${data}`);
        //console.log(`[STDERR]:${iconv.decode(data, "euc-kr")}`);
        //console.log(`[STDERR]:${data.toString("hex")}`);
    });
    child.on("close", (code)=>{
        let e = `childProcess is closed by code ${code}`;
        console.log("[Main]"+e);
        mainWindow.webContents.send(Channel.PROCESS, e);
    });
}
export function assignIPCHandler(mainWindow:BrowserWindow) {
  ipcMain.on(Channel.PROCESS, (event, args) => {
    switch(args){
        case Process.START:{
            //프로세스시작하라는명령도착
            m5nStart(mainWindow);
            event.returnValue = ReplyCode.SUCCESS;
            break;
        }
        default:{
            event.returnValue = ReplyCode.ERROR;
            break;
        }
    }
  }
  );
}
