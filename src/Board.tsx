import { useEffect, useState } from 'react';
import { color } from './DashBoard';
import { turnStatus } from './Page';
import { ipcRenderer } from 'electron';
import { Channel, gameMessageByIpc } from './protocol';

type boardProps = {
  putStoneOnSquare:(row: number, col: number, colour: color)=>void
  nowTurn:turnStatus,
  squares: string[][] | null[][],
  myColor:color
}

export default function Board({putStoneOnSquare, nowTurn, squares, myColor}:boardProps){
  /* const initial_board = Array(15).fill(null).map(() => Array(15).fill(null));
  var initial_stone = false //false:white, true:black
  //states
  const [squares, setSquares] = useState(initial_board);
  const [isNowBlack, setIsNowBlack] = useState(initial_stone);
 */
  //handler
  const handleSquareClick = (index_row:number, index_col:number)=>{
    putStoneOnSquare(index_row, index_col, myColor);
    ipcRenderer.send(Channel.GAME, {x:index_col, y:index_row});
  }


  //render
  const oneRowRender = (index_row: number)=>{
    const result = []
    for (let index_col = 0; index_col<squares[index_row].length; index_col++){
      result.push(<Square value={squares[index_row][index_col]} key={`${index_row} ${index_col}`} onSquareClick={() => { handleSquareClick(index_row, index_col); } } nowTurn={nowTurn} myColor={myColor} />)
    };
    return result;
  };
  const RowsRender = ()=>{
    const result = []
    for(let index_row = 0; index_row<squares.length; index_row++){
      result.push(<div key={`${index_row}`} className='board-row'>{oneRowRender(index_row)}</div>);
    };
    return result;
  };

  //return
  return (
    <>
      {RowsRender()}
    </>
  );
}

type squareProps = {
  value: string,
  nowTurn:turnStatus,
  onSquareClick: ()=>void,
  myColor:color
}

const Square = ({value, onSquareClick, nowTurn, myColor}: squareProps)=>{
  return (
    <button 
      disabled={nowTurn!==turnStatus.MYPUT}
      className="square"
      onClick={onSquareClick}
      //onMouseEnter={squareOnMouseEnterHandler}
      >
      {value}
    </button>
  );
}

function squareOnMouseEnterHandler(){
  ;
}