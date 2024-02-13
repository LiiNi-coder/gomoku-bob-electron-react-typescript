import React, { useState } from "react";
import Board from "./Gomoku";

import M5nControler from "./rendererProtocol";

function GameSelect(){
    const [game, setGame] = useState<string | null>(null);

    //handler
    async function handleAiByLocalClick(){
        setGame("aiByLocal");
        //console.log(ipcRenderer.sendSync("startSync", "fromRender"));
        let m5n = new M5nControler();
        let temp = await m5n.start();
        console.log(temp);
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