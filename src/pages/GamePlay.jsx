import { useEffect, useState } from "react";
import GameBoard from '../components/GameBoard';
import StatusBar from '../components/StatusBar';
import WinnerModal from '../components/WinnerModal';
import '../styles/GamePlay.css';

const GamePlay = ()=>{
    const [playerEmojis, setPlayerEmojis] = useState({});
    const [winner, setWinner] = useState(null);
    const [currentPlayer,setCurrentPlayer] = useState('player1')
    const [mode, setMode] = useState('pvp');

    useEffect(() => {
    const savedEmojis = JSON.parse(localStorage.getItem('playerEmojis'));
    if (savedEmojis) setPlayerEmojis(savedEmojis);
     const savedMode = localStorage.getItem('mode');
    if (savedEmojis) setPlayerEmojis(savedEmojis);
    if (savedMode) setMode(savedMode);
  }, [])


    return(
         <div className="gameplay-container">
      <div className= {`side-panel left ${currentPlayer === 'player1' ? 'active-player' : ""}`}>
        <h3>Player 1</h3>
        <div className="emoji-list">{playerEmojis.player1?.join(' ')}</div>
      </div>

      <div className="game-area">
        {Object.keys(playerEmojis).length > 0 && (
          <GameBoard
            playerEmojis={playerEmojis}
            currentPlayer = {currentPlayer}
            setCurrentPlayer = {setCurrentPlayer}
            onWin={(winnerPlayer) => setWinner(winnerPlayer)}
            mode={mode}
          />
        )}
      </div>

      <div className= {`side-panel right ${currentPlayer === 'player2'  ? "active-player":""}`}>
        <h3>{(mode === 'pvp')? "Player 2": "AI Robot"}</h3>
        <div className="emoji-list">{playerEmojis.player2?.join(' ')}</div>
      </div>

      {winner && <WinnerModal winner={winner} mode={mode} />}

    </div>
    )
}

export default GamePlay