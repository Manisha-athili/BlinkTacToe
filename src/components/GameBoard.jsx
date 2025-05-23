import StatusBar from './StatusBar';
import '../styles/GameBoard.css'
import { useState } from "react";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; 

const GameBoard = ({ playerEmojis, onWin, currentPlayer, setCurrentPlayer})=>{
  const [board, setBoard] = useState(Array(9).fill(""));
  const [moves,setMoves] = useState({
    player1 : [],
    player2:[]
  });


  const handleClick=(ind)=>{
     if (board[ind]) return;

     const emojiList = playerEmojis[currentPlayer];
     const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

     const updatedMoves = {...moves};
     const newBoard = [...board];

     if(updatedMoves[currentPlayer].length === 3){
      const [oldest] = updatedMoves[currentPlayer]
      newBoard[oldest] = null;
      updatedMoves[currentPlayer] = updatedMoves[currentPlayer].slice(1)
     }

     updatedMoves[currentPlayer].push(ind);
     newBoard[ind] = { emoji: randomEmoji, player: currentPlayer };


      setBoard(newBoard);
     setMoves(updatedMoves);

     if(checkWin(currentPlayer, newBoard)){
      onWin(currentPlayer);
     }else{
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2': 'player1')
     }
  }

  const checkWin = (Player, customBoard) => {
    const boardToCheck = customBoard || board;
  const positions = boardToCheck
    .map((cell, index) => (cell?.player === Player ? index : null))
    .filter((i) => i !== null);

  return winningCombinations.some((combo) =>
    combo.every((index) => positions.includes(index))
  );
};


  return(
    <>
     <StatusBar currentPlayer = {currentPlayer}/>
     <div className="game-board"> 
        {
          board.map((cell,index)=>(
            <div
            key={index}
            className={
              `cell ${!cell ? `highlight-${currentPlayer}` : ''}`
            }
            onClick={()=>handleClick(index)}
            >
              {cell?cell.emoji : ""}
            </div>
          ))
        }
     </div>
    </>
  )
}

export default GameBoard;