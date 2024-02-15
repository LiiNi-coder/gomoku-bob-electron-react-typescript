import React, { useEffect, useState } from "react";
import Board from "./Board";

import { m5nStart } from "./rendererProtocol";
import { ReplyCode } from "./protocol";
import GameControler from "./GameControler";
import Button from "react-bootstrap/Button";

export enum matchStatus{
    UNMATCHED,
    MATCHING,
    MATCHED
};

export default function DashBoard(){

    //state
    const [game, setGame] = useState<string | null>(null);
    const [isMatched, setIsMathched] = useState<matchStatus>(matchStatus.UNMATCHED);
    useEffect(()=>{
        console.log(`[isMatched]${isMatched}`);
    })
    //handler
    async function handleAiLocalPlayClick(){
        setGame("AiLocalPlay");
        setIsMathched(matchStatus.MATCHING);
        m5nStart()
            .then(()=>setIsMathched(matchStatus.MATCHED))
            .catch((error)=>{
                console.warn(error);
                setIsMathched(matchStatus.UNMATCHED);
            });
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
        {
            isMatched === matchStatus.UNMATCHED
            ? <Button variant="outline-primary" onClick={handleAiLocalPlayClick}>[myAI]Local Server대전 시작</Button>
            //? <button onClick={handleAiLocalPlayClick}>[myAI]Local Server대전 시작</button>
            : <GameControler isMatched={isMatched}/>
        }
        </>
    );
}