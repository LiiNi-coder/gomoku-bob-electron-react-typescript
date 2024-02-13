//import './App.css';
import { useEffect, useState } from 'react';

type squareProps = {
  value: string;
  onSquareClick: ()=>void;
}

const Square = ({value, onSquareClick}: squareProps)=>{
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board(){
  const initial_board = Array(15).fill(null).map(() => Array(15).fill(null));
  var initial_stone = false //false:white, true:black
  //states
  const [squares, setSquares] = useState(initial_board);
  const [isNowBlack, setIsNowBlack] = useState(initial_stone);

  //handler
  function handleSquareClick(row: number, col: number){
    //놓은곳을 또 놓으려할때 처리
    if(squares[row][col] !== null)
      return;

    //불변성위한 복제 및 돌 놓기
    const new_squares = squares.map(r=>[...r]);
    const new_row = new_squares[row].slice();
    new_row[col] = isNowBlack? "⚫" : "⚪";
    new_squares[row] = new_row;

    //상태변환
    setSquares(new_squares);
    setIsNowBlack(!isNowBlack);
  }

  //render
  const oneRowRender = (index_row: number)=>{
    const result = []
    for (let index_col = 0; index_col<squares[index_row].length; index_col++){
      result.push(<Square value={squares[index_row][index_col]} key={`${index_row} ${index_col}`} onSquareClick={()=>{handleSquareClick(index_row, index_col);}}/>)
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

export default Board;
