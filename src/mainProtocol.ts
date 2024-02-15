const path = require('path');
const url = require('url');
import { spawn } from "child_process";
import { BrowserWindow, ipcMain } from "electron";
import { Channel, Game, Process, ReplyCode } from "./protocol";
const iconv = require("iconv-lite");
require('dotenv').config();

export function assignIPCHandler(mainWindow:BrowserWindow) {
    const ipcMainHandlers = {
        [Process.START]: (event:Electron.IpcMainEvent)=>{
            //프로세스시작하라는명령도착
            m5nStart(mainWindow);
            //event.returnValue = ReplyCode.SUCCESS;
        },
        [Process.EXIT]: (event:Electron.IpcMainEvent)=>{
            ;
        },
        [Process.STDERR]: (event:Electron.IpcMainEvent)=>{
            ;
        }
    }
    ipcMain.on(Channel.PROCESS, (event, args:Process) => {
        // switch(args){
        //     case Process.START:{
        //         //프로세스시작하라는명령도착
        //         m5nStart(mainWindow);
        //         event.returnValue = ReplyCode.SUCCESS;
        //         break;
        //     }
        //     default:{
        //         event.returnValue = ReplyCode.ERROR;
        //         break;
        //     }
        // }
        
        //상황에 맞는 핸들러 실행
        ipcMainHandlers[args](event);
    }
    );
}

type handlerStringFunction = {
    set_colour: () => void;
    set_stone: () => void;
    choose_colour: () => void;
    place_stone: () => void;
    make_decision: () => void;
    victory: () => void;
    defeat: () => void;
    [key: string]: any;
}
const handlersByM5nStdout:handlerStringFunction = {
    "set_colour":()=>{
        //색깔 지정됨
        
    },
    "set_stone":()=>{
        //
    },
    "choose_colour":()=>{

    },
    "place_stone":()=>{

    },
    "make_decision":()=>{

    },
    "victory":()=>{

    },
    "defeat":()=>{
        
    }
}

function m5nStart(mainWindow:BrowserWindow){
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

    function dataToJobs(data: object) {
        let tokens_by_sep = data.toString().split("|").slice(1);
        let jobs:m5njob[] = [];
        for(let token of tokens_by_sep){
            let temp = token.split("\n");
            jobs.push({
                command:temp[0],
                text:temp.slice(1)
            });
        }
        return jobs;
    }

    //handler
    child.stdout.on("data", (data:object)=>{
        console.log(`[STDOUT]${data.toString()}`);
        if(data.toString().startsWith("esta")){
            mainWindow.webContents.send(Channel.GAME,Game.ESTABLISHCONNECTION);
            return;
        }
        let jobs = dataToJobs(data);
        for(let job of jobs){
            if(handlersByM5nStdout[job.command]){
                // 핸들러실행
                handlersByM5nStdout[job.command]();
            }else{
                // m5n의 출력중 개발자가 상정하지않은것이 있었다
                console.error("m5n's output is not handled.");
            }
        }
        
        //child.stdin.write("1,1\n");
    });
    child.stderr.on("data", (data)=>{
        console.warn(`[STDERR]${data}`);
        //console.log(`[STDERR]:${iconv.decode(data, "euc-kr")}`);
        //console.log(`[STDERR]:${data.toString("hex")}`);
        mainWindow.webContents.send(Channel.PROCESS, Process.STDERR);
    });
    child.on("close", (code)=>{
        let e = `childProcess is closed by code ${code}`;
        console.log("[M5nClosed]"+e);
        mainWindow.webContents.send(Channel.PROCESS, Process.EXIT);
    });
}


type m5njob = {
    command:string,
    text:string[]
}

