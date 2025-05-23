import React, { useState } from 'react';
import './GameBoard.css';

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

const GameBoard = ({ playerEmojis, onWin }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [moves, setMoves] = useState({ player1: [], player2: [] });

  const checkWin = (player) => {
    const positions = board
      .map((cell, index) => (cell?.player === player ? index : null))
      .filter((i) => i !== null);

    return winningCombinations.some((combo) =>
      combo.every((index) => positions.includes(index))
    );
  };

  const handleClick = (index) => {
    if (board[index]) return;

    const emojiList = playerEmojis[currentPlayer];
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    const updatedMoves = { ...moves };
    const newBoard = [...board];

    // Remove oldest move if there are already 3
    if (updatedMoves[currentPlayer].length === 3) {
      const [oldest] = updatedMoves[currentPlayer];
      newBoard[oldest] = null;
      updatedMoves[currentPlayer] = updatedMoves[currentPlayer].slice(1);
    }

    updatedMoves[currentPlayer].push(index);
    newBoard[index] = { emoji: randomEmoji, player: currentPlayer };

    setBoard(newBoard);
    setMoves(updatedMoves);

    if (checkWin(currentPlayer)) {
      onWin(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }
  };

  return (
    <>
      <StatusBar currentPlayer={currentPlayer} />
      <div className="game-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell ? cell.emoji : ''}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
