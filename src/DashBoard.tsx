import React, { useEffect, useState } from "react";
import Board from "./Board";

import { m5nStart } from "./rendererProtocol";
import { Channel, Game, Process, ReplyCode } from "./protocol";
import GameControler from "./GameControler";
import Button from "react-bootstrap/Button";
const { ipcRenderer } = window.require("electron");
import { Spinner } from "react-bootstrap";

export enum matchStatus{
    UNMATCHED,
    // CONNECTING,
    MATCHING,
    MATCHED
};

export default function DashBoard(){
    //state
    //const [game, setGame] = useState<string | null>(null);
    const [isMatched, setIsMathched] = useState<matchStatus>(matchStatus.UNMATCHED);
    
    //매번 렌더링시에 아래콜백함수실행
    useEffect(()=>{
        console.log(`[isMatched]${isMatched}`);
    });
    //

    //handler
    async function handleAiLocalPlayClick(){
        //setGame("AiLocalPlay");
        ipcRenderer.send(Channel.PROCESS, Process.START);
        ipcRenderer.on(Channel.PROCESS, (_, args:Process)=>{
            switch(args){
                case Process.STDERR:{
                    ipcRenderer.removeAllListeners(Channel.PROCESS);
                    setTimeout(()=>{
                        setIsMathched(matchStatus.UNMATCHED);
                    }, 3000);
                    break;
                }
            }
        });
        ipcRenderer.on(Channel.GAME, (_, args:Game)=>{
            switch(args){
                case Game.ESTABLISHCONNECTION:{
                    setIsMathched(matchStatus.MATCHING);
                    break;
                }
                case Game.GAMESTART:{
                    setIsMathched(matchStatus.MATCHED);
                    break;
                }
            }
        });
        // try {
        //     await m5nStart(setIsMathched);
        // } catch (error) {
        //     console.warn(error);
        //     setIsMathched(matchStatus.UNMATCHED);
        // };
    }

    switch(isMatched){
        case matchStatus.UNMATCHED:
            return (<Button variant="outline-primary" onClick={handleAiLocalPlayClick}>[myAI]Local Server대전 시작</Button>);
        case matchStatus.MATCHING:
            return (
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />상대를 찾고 있습니다...
            </Button>);  // 로딩창을 렌더링합니다.
        case matchStatus.MATCHED:
            return (<GameControler />);
    }
}