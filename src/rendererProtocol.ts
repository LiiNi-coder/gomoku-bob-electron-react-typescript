// 렌더러프로세스 입장에서 메인프로세스에게 m5n관련해서 메세지보내는 것을 기술
const { ipcRenderer } = window.require("electron");
import { ReplyCode, Channel, Process } from "./protocol";

export async function m5nStart(){
    ipcRenderer.on(Channel.PROCESS, (event, args)=>{
        //m5n프로세스가 종료되었을때
       console.log(`[Render]${args}`);
    });

    return await <ReplyCode>ipcRenderer.sendSync(Channel.PROCESS, Process.START);
}