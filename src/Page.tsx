import { SetStateAction, useState } from "react";
import Board from "./Board";
import DashBoard, { color } from "./DashBoard";
import { Channel, Game, Process, gameMessageByIpc } from "./protocol";
const { ipcRenderer } = window.require("electron");

export enum matchStatus{
    UNMATCHED,
    // CONNECTING,
    MATCHING,
    MATCHED
};
export enum turnStatus{
    MYPUT,
    OPPONENTTURN,
    DECISIONSWAP,
    CHOOSECOLOR,
    WIN,
    LOSE
}
export default function Page(){
    const initial_board = Array(15).fill(null).map(() => Array(15).fill(null));
    const [squares, setSquares] = useState<string[][]|null[][]>(initial_board);
    const [isMatched, setIsMatched] = useState<matchStatus>(matchStatus.UNMATCHED);
    const [nowTurn, setNowTurn] = useState<turnStatus|null>(null);
    const [myColor, setMyColor] = useState<color|null>(null);
    
    //handler
    function putStoneOnSquare(row: number, col: number, colour: color){
        //놓은곳을 또 놓으려할때 처리
        if(squares[row][col] !== null){
            console.error("There is already a stone in the place where you want to place it.")
            return;
        }
        //불변성위한 복제 및 돌 놓기
        const new_squares = squares.map(r=>[...r]);
        const new_row = new_squares[row].slice();
        new_row[col] = (colour === color.BLACK) ? "⚫" : "⚪";
        new_squares[row] = new_row;
        setSquares(new_squares);
    }

    function assignHandlerGameChannel() {
        ipcRenderer.on(Channel.GAME, (_, args:gameMessageByIpc)=>{
            //Game채널에서 메세지를 받으면 게임시작으로 취급함
            if(isMatched!==matchStatus.MATCHED)
                setIsMatched(matchStatus.MATCHED);
            if(!nowTurn)
                setNowTurn(turnStatus.OPPONENTTURN);
            switch(args["keyword"]){
                case Game.SETCOLOR:{
                    setMyColor(args["color"]);
                    break;
                }
                case Game.SETSTONE:{
                    putStoneOnSquare(args["y"], args["x"], args["color"]);
                    break;
                }
                case Game.CHOOSECOLOR:{
                    setNowTurn(turnStatus.CHOOSECOLOR);
                    break;
                }
                case Game.PLACESTONE:{
                    setNowTurn(turnStatus.MYPUT);
                    //이제서야 돌을 놓을 수 있게 함
                    break;
                }
                case Game.MAKEDECISION:{
                    setNowTurn(turnStatus.DECISIONSWAP);
                    break;
                }
                case Game.VICTORY:{
                    setNowTurn(turnStatus.WIN);
                    break;
                }
                case Game.DEFEAT:{
                    setNowTurn(turnStatus.LOSE);
                    break;
                }
            }
        });
    }
    function handleAiLocalPlayClick(){
        //setGame("AiLocalPlay");
        ipcRenderer.send(Channel.PROCESS, Process.START);
        ipcRenderer.on(Channel.PROCESS, (_, args:Process)=>{
            switch(args){
                case Process.STDERR:{
                    ipcRenderer.removeAllListeners(Channel.PROCESS);
                    ipcRenderer.removeAllListeners(Channel.GAME);
                    setTimeout(()=>{
                        setIsMatched(matchStatus.UNMATCHED);
                    }, 5000);
                    break;
                }
                case Process.ESTABLISHCONNECTION:{
                    setIsMatched(matchStatus.MATCHING);
                    assignHandlerGameChannel();
                }
            }
        });
    }
    return (
        <div style={parent_inline_sytle}>
            <div style={dashboard_inline_style}>
                <DashBoard
                    myColor={myColor}
                    isMatched={isMatched}
                    setIsMatched={setIsMatched}
                    handleAiLocalPlayClick={handleAiLocalPlayClick}
                    nowTurn={nowTurn} />
            </div>
            <div>
                {isMatched===matchStatus.MATCHED && <Board putStoneOnSquare={putStoneOnSquare} nowTurn={nowTurn} squares={squares} myColor={myColor} />}
            </div>
        </div>
    );
}

const parent_inline_sytle:React.CSSProperties = {
    display:"flex",/* 자식들 가로배치 */
    alignItems:"flex-start"/* flex하면 두번째자식이 첫번째자식의 height를 따라가는 문제있어서 이를 무시 */
}
const dashboard_inline_style:React.CSSProperties = {
    width:250
}