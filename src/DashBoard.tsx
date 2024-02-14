import React, { useState } from "react";
import Board from "./Board";

import { m5nStart } from "./rendererProtocol";
import { ReplyCode } from "./protocol";

export default function DashBoard(){

    //state
    const [game, setGame] = useState<string | null>(null);
    const [isMatched, setIsMathched] = useState<string | null>(null);
    
    //handler
    async function handleAiLocalPlayClick(){
        setGame("AiLocalPlay");
        if(await m5nStart() === ReplyCode.SUCCESS){
            console.log("주고받기 성공");
        }
    }

    //return
    //TEST
    // if(game===null){
    //     return <button className="game-mode button" onClick={()=>{handleAiByLocalClick();}}>AIvs상대 by localServer</button>;
    // }else{
    //     return <Board />;
    // }
    return (
        <>
            <button onClick={handleAiLocalPlayClick}>[myAI]Local Server대전 시작</button>
        </>
    );
}