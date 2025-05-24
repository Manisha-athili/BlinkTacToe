import StatusBar from './StatusBar';
import '../styles/GameBoard.css'
import { useEffect, useState } from "react";

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

const GameBoard = ({ playerEmojis, onWin, currentPlayer, setCurrentPlayer, mode }) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [moves, setMoves] = useState({
    player1: [],
    player2: []
  });
  const [lastMove, setLastMove] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  useEffect(() => {
    const winner = checkWin('player1', board) || checkWin('player2', board);
    if (mode === 'ai' && currentPlayer === 'player2' && !winner) {
      const timeout = setTimeout(() => {
        makeAIMove();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board]);

  useEffect(() => {
    if (lastMove !== null) {
      const timeout = setTimeout(() => {
        setLastMove(null);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [lastMove]);

  const makeAIMove = () => {
    const emptyIndices = board
      .map((cell, i) => (cell ? null : i))
      .filter((i) => i !== null);

    if (emptyIndices.length === 0) return;

    const index = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleClick(index);
  };

  const handleClick = (ind) => {
    if (board[ind]) return;

    const usedEmojis = moves[currentPlayer]
      .map(i => board[i]?.emoji)
      .filter(Boolean); 
    
    const availableEmojis = playerEmojis[currentPlayer].filter(
      emoji => !usedEmojis.includes(emoji)
    );

    if (availableEmojis.length === 0) {
      alert("No more unique emojis left!");
      return;
    }

    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];

    const updatedMoves = { ...moves };
    const newBoard = [...board];

    if (updatedMoves[currentPlayer].length === 3) {
      const [oldest] = updatedMoves[currentPlayer];
      newBoard[oldest] = null;
      updatedMoves[currentPlayer] = updatedMoves[currentPlayer].slice(1);
    }

    updatedMoves[currentPlayer].push(ind);
    newBoard[ind] = { emoji: randomEmoji, player: currentPlayer };

    setBoard(newBoard);
    setMoves(updatedMoves);
    setLastMove(ind);

    const winner = checkWin(currentPlayer, newBoard);
    if (winner) {
      const winningCombo = getWinningCombination(currentPlayer, newBoard);
      setWinningCells(winningCombo);
      onWin(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }
  };

  const checkWin = (Player, customBoard) => {
    const boardToCheck = customBoard || board;
    const positions = boardToCheck
      .map((cell, index) => (cell?.player === Player ? index : null))
      .filter((i) => i !== null);

    return winningCombinations.some((combo) =>
      combo.every((index) => positions.includes(index))
    );
  };

  const getWinningCombination = (Player, customBoard) => {
    const boardToCheck = customBoard || board;
    const positions = boardToCheck
      .map((cell, index) => (cell?.player === Player ? index : null))
      .filter((i) => i !== null);

    const winningCombo = winningCombinations.find((combo) =>
      combo.every((index) => positions.includes(index))
    );
    return winningCombo || [];
  };

  const getCellClassName = (index) => {
    let className = 'cell';

    if (lastMove === index) {
      className += ' new-move';
    }
    
    if (winningCells.includes(index)) {
      className += ' winning-cell';
    }
    return className;
  };

  const handleMenu = () => {
    window.location.href = '/';
  }

  const handleNewGame = () => {
    setBoard(Array(9).fill(""));
    setMoves({ player1: [], player2: [] });
    setLastMove(null);
    setWinningCells([]);
    setCurrentPlayer('player1');
  }

  return (
    <div className="game-container">
      <h1>Emoji Clash</h1>
      
      <StatusBar 
        currentPlayer={currentPlayer} 
        playerEmojis={playerEmojis}
        className="status-bar"
        mode={mode}
      />
      
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={getCellClassName(index)}
            onClick={() => handleClick(index)}
            disabled={!!cell}
            aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell.player}` : ', empty'}`}
          >
            {cell && (
              <span className="cell-emoji">
                {cell.emoji}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="game-controls">
        <button className="game-btn" onClick={handleMenu}>
          Return to Menu
        </button>
        <button className="game-btn" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  )
}

export default GameBoard;