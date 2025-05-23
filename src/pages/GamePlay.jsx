import { useEffect, useState } from "react";
import GameBoard from '../components/GameBoard';
import StatusBar from '../components/StatusBar';
import WinnerModal from '../components/WinnerModal';
import '../styles/GamePlay.css';

const GamePlay = ()=>{
    const [playerEmojis, setPlayerEmojis] = useState({});
    const [winner, setWinner] = useState(null);
    const [currentPlayer,setCurrentPlayer] = useState('player1')

    useEffect(() => {
    const data = JSON.parse(localStorage.getItem('playerEmojis'));
    if (data) setPlayerEmojis(data);
  }, [])


    return(
         <div className="gameplay-container">
      <div className="side-panel left">
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
            
          />
        )}
      </div>

      <div className="side-panel right">
        <h3>Player 2</h3>
        <div className="emoji-list">{playerEmojis.player2?.join(' ')}</div>
      </div>

      {winner && <WinnerModal winner={winner} />}
    </div>
    )
}

export default GamePlay