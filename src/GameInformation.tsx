import React from 'react';
import { color } from "./DashBoard";
import { turnStatus } from "./Page";

type GameInformationProps = {
    myColor:color,
    nowTurn:turnStatus
}

export default function GameInformation({myColor, nowTurn}:GameInformationProps){    
    return (
    <>
    <div className="color-info" style={{display:"flex", height:60}}>
        <div className="my-color" style={inline_css}>
            나: {myColor===color.BLACK ? "⚫" : "⚪"}
        </div>
        <div className="opponent-color" style={inline_css}>
            상대: {myColor===color.BLACK ? "⚪" : "⚫"}
        </div>
    </div>
    <div className="result-info">
        {nowTurn === turnStatus.WIN && <WinComponent />}
        {nowTurn === turnStatus.LOSE && <LoseComponent />}
    </div>
    </>
    );
}

const WinComponent = ()=>{
    return (<>
    <h1>당신이 이겼습니다!</h1>
    </>);    
}

const LoseComponent = ()=>{
    return (<>
    <h1>당신의 패배입니다...</h1>
    </>);    
}
const inline_css:React.CSSProperties = {
    fontSize:30,
    width:125,
    fontWeight:"bold"
}