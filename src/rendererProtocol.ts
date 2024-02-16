// // 렌더러프로세스 입장에서 메인프로세스에게 m5n관련해서 메세지보내는 것을 기술
// const { ipcRenderer } = window.require("electron");
// import { matchStatus } from "./DashBoard";
// import { ReplyCode, Channel, Process, Game } from "./protocol";

// export function m5nStart(setIsMatched:React.Dispatch<React.SetStateAction<matchStatus>>):Promise<void>{
//     ipcRenderer.send(Channel.PROCESS, Process.START);
//     return new Promise((resolve, reject)=>{
//         ipcRenderer.on(Channel.PROCESS, (event, args)=>{
//             console.log("channel.PROCESS massage recevied");
//             switch(args){
//                 case Process.STDERR:{
//                     reject(new Error("m5n emit stderr message."));
//                     break;
//                 }
//             }
//         });
//         ipcRenderer.on(Channel.GAME, (event, args)=>{
//             console.log("channel.GAME massage recevied");
//             switch(args){
//                 case Game.ESTABLISHCONNECTION:{
//                     setIsMatched(matchStatus.MATCHING);
//                     break;
//                 }
//                 case Game.GAMESTART:{
//                     setIsMatched(matchStatus.MATCHED);
//                     resolve();
//                     break;
//                 }
//             }
//         });
//     });
// }