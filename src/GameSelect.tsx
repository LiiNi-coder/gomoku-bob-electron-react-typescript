import React, { useState } from "react";
import Board from "./Gomoku";
const { ipcRenderer } = window.require("electron");
//import M5nControler from "./rendererProtocol";

function GameSelect(){
    const [game, setGame] = useState<string | null>(null);

    //handler
    async function handleAiByLocalClick(){
        setGame("aiByLocal");
        console.log(ipcRenderer.sendSync("startSync", "fromRender"));
        //let m5n = new m5nControler();
        //await m5n.start();
        console.log("m5nControler start함수실행됨");
    }

    //return
    if(game===null){
        return <button className="game-mode button" onClick={()=>{handleAiByLocalClick();}}>AIvs상대 by localServer</button>;
    }else{
        return <Board />;
    }
}

export default GameSelect;