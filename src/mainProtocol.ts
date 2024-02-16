const path = require('path');
const url = require('url');
import { spawn } from "child_process";
import { BrowserWindow, ipcMain } from "electron";
import { Channel, Game, Process, ReplyCode, gameMessageByIpc } from "./protocol";
import { color } from "./DashBoard";
const iconv = require("iconv-lite");
require('dotenv').config();

export function assignIPCHandler(mainWindow:BrowserWindow) {
    ipcMain.on(Channel.PROCESS, (event, args:Process) => {
        switch(args){
            case Process.START:{
                m5nStart(mainWindow);
                break;
            }
            default:{
                console.warn("An unexpected message has arrived from ipcRenderer");
                break;
            }
        }
    }
    );
}



function m5nStart(mainWindow:BrowserWindow){
    const [server_ip, port, cwd] = [process.env.SERVER_IP, process.env.PORT, process.env.M5N_CWD];
    const child = spawn("M5N.Slave",
        [`${server_ip}:${port}`, `./app`, `main`],
        {
            //detached:true,
            cwd:cwd,
            shell:true,
            //TEST
            timeout:30000,
        }
        );

    function dataToJobs(data: object) {
        //console.log(`[dataToJobs]${data.toString()}`);
        let tokens_by_sep = data.toString().trim().split("|").slice(1);
        let jobs:m5njob[] = [];
        for(let token of tokens_by_sep){
            let temp = token.trim().split(/\r?\n/);
            jobs.push({
                command:temp[0],
                text:temp.slice(1)
            });
        }
        return jobs;
    }
    type handlerGameFunction = {
        [key in Game]: (texts:string[]) => void;
    };
    const handlersByM5nStdout:handlerGameFunction = {
        [Game.SETCOLOR]:(texts)=>{
            console.log(`[SETCOLOR Handler] ${texts}`);
            //서버에서 내 색깔이 정해져서 이를 renderer에 전달해야함
            const message:gameMessageByIpc = {
                keyword: Game.SETCOLOR,
                color: parseInt(texts[0])
            };
            mainWindow.webContents.send(Channel.GAME, message);
        },
        [Game.SETSTONE]:(texts)=>{
            console.log(`[SETSTONE Handler] ${texts}`);
            const temp = texts[0].split(",");
            const message:gameMessageByIpc = {
                keyword: Game.SETSTONE,
                x: parseInt(temp[0]),
                y: parseInt(temp[1]),
                color: parseInt(texts[2])
            };
            mainWindow.webContents.send(Channel.GAME, message);
        },
        [Game.CHOOSECOLOR]:(texts)=>{
            console.log(`[CHOOSECOLOR Handler] ${texts}`);
            const message:gameMessageByIpc = {
                keyword: Game.CHOOSECOLOR
            };
            ipcMain.on(Channel.GAME, (_, args:color)=>{
                //사용자가 색깔을 골랐고, 고른 내용을 ipcRenderer한테서 받아옴
                ipcMain.removeAllListeners(Channel.GAME);
                let input = (args===color.WHITE) ? "WHITE" : "BLACK";
                child.stdin.write(input+"\n");
            })
            mainWindow.webContents.send(Channel.GAME, message);
        },
        [Game.PLACESTONE]:(texts)=>{
            console.log("[PLACESTONE Handler]");
            const message:gameMessageByIpc = {
                keyword: Game.PLACESTONE
            };
            ipcMain.on(Channel.GAME, (_, args:gameMessageByIpc)=>{
                //사용자가 색깔을 골랐고, 고른 내용을 ipcRenderer한테서 받아옴
                ipcMain.removeAllListeners(Channel.GAME);
                child.stdin.write(`${args.x},${args.y}\n`);
            })
            mainWindow.webContents.send(Channel.GAME, message);
        },
        [Game.MAKEDECISION]:(texts)=>{
            console.log("[MAKEDECISION Handler]");
        },
        [Game.VICTORY]:(texts)=>{
            console.log("[VICTORY Handler]");
        },
        [Game.DEFEAT]:(texts)=>{
            console.log("[DEFEAT Handler]");
        }
    }
    //handler
    child.stdout.on("data", (data:object)=>{
        //console.log(`[STDOUT]${data.toString()}`);
        if(data.toString().startsWith("Connection established")){
            mainWindow.webContents.send(Channel.PROCESS,Process.ESTABLISHCONNECTION);
            return;
        }
        let jobs = dataToJobs(data);
        for(let job of jobs){
            if(job.command in handlersByM5nStdout){                
                // 핸들러실행
                handlersByM5nStdout[job.command as Game](job.text);
            }else{
                console.error("[LOGICBUG]m5n's output is not handled.");
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