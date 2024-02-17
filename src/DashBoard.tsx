import React, { useEffect, useState } from "react";
import GameControler from "./GameControler";

import GameEntry from "./GameEntry";
import GameInformation from "./GameInformation";
import { matchStatus, turnStatus } from "./Page";

export enum color{
    WHITE=1,
    BLACK=2,
}
export type dashBoardProps={
    myColor:color
    isMatched:matchStatus,
    setIsMatched:React.Dispatch<React.SetStateAction<matchStatus>>
    handleAiLocalPlayClick:()=>void
    nowTurn:turnStatus
}
export default function DashBoard({myColor, isMatched, setIsMatched, handleAiLocalPlayClick, nowTurn}:dashBoardProps){
    //state
    
    //매번 렌더링시에 아래콜백함수실행
    useEffect(()=>{
        console.log(`[isMatched]${isMatched}`);
    });

    return (
    <>
    <div className="GameEntry-wrapper" style={{height:60, padding:10}}>
        <GameEntry isMatched={isMatched} handleAiLocalPlayClick={handleAiLocalPlayClick} />
    </div>
    <div className="GameInformation-wrapper" style={{height:300}}>
        {isMatched === matchStatus.MATCHED && <GameInformation myColor={myColor} nowTurn={nowTurn}/>}
    </div>
    <div className="GameControler-wrapper" style={{height:135}}>
        {isMatched === matchStatus.MATCHED && <GameControler nowTurn={nowTurn}/>}
    </div>
    </>);
}
