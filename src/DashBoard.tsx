import React, { useEffect, useState } from "react";
import Board from "./Board";
import { Channel, Game, Process, ReplyCode } from "./protocol";
import GameControler from "./GameControler";
const { ipcRenderer } = window.require("electron");
import GameEntry from "./GameEntry";
import GameInformation from "./GameInformation";

export enum matchStatus{
    UNMATCHED,
    // CONNECTING,
    MATCHING,
    MATCHED
};
export enum color{
    BLACK,
    WHITE
}
export default function DashBoard(){
    //state
    //const [game, setGame] = useState<string | null>(null);
    const [isMatched, setIsMathched] = useState<matchStatus>(matchStatus.UNMATCHED);
    const [myColor, setMyColor] = useState<color|null>(null);
    const [myTurn, setMyTurn] = useState(false);
    
    //매번 렌더링시에 아래콜백함수실행
    useEffect(()=>{
        console.log(`[isMatched]${isMatched}`);
    });
    
    //handler
    function assignHandlerGameChannel() {
        ipcRenderer.on(Channel.GAME, (_, args:Game)=>{
            //Game채널에서 메세지를 받으면 게임시작으로 취급함
            if(isMatched!==matchStatus.MATCHED)
                setIsMathched(matchStatus.MATCHED);
            switch(args){
                case Game.SETCOLOR:{
                    break;
                }
                case Game.SETSTONE:{
                    break;
                }
            }
        });
    }
    async function handleAiLocalPlayClick(){
        //setGame("AiLocalPlay");
        ipcRenderer.send(Channel.PROCESS, Process.START);
        ipcRenderer.on(Channel.PROCESS, (_, args:Process)=>{
            switch(args){
                case Process.STDERR:{
                    ipcRenderer.removeAllListeners(Channel.PROCESS);
                    ipcRenderer.removeAllListeners(Channel.GAME);
                    setTimeout(()=>{
                        setIsMathched(matchStatus.UNMATCHED);
                    }, 5000);
                    break;
                }
                case Process.ESTABLISHCONNECTION:{
                    setIsMathched(matchStatus.MATCHING);
                    assignHandlerGameChannel();
                }
            }
        });
        
    }

    return (
    <>
    <div className="GameEntry-wrapper" style={{height:60, padding:10}}>
        <GameEntry isMatched={isMatched} handleAiLocalPlayClick={handleAiLocalPlayClick} />
    </div>
    <div className="GameInformation-wrapper" style={{height:300}}>
        {isMatched === matchStatus.MATCHED && <GameInformation myColor={myColor} />}
    </div>
    <div className="GameControler-wrapper" style={{height:135}}>
        {isMatched === matchStatus.MATCHED && <GameControler />}
    </div>
    </>);
}
