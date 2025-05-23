import '../styles/WinnerModal.css'

const WinnerModal = ({winner})=> {
  
  const handleRestart=()=>{
    window.location.href='/game';
  }
  const handleMenu =()=>{
    window.location.href='/';
  }
  const handleNewGame=()=>{
    localStorage.removeItem('playerEmojis')
    window.location.href = '/'
  }

  return(
    <div className="modal-overlay">
      <div className="winner-modal">
        <div className="sparkles">
            ✨ 🎉 ✨
        </div>
        <h2>{
          winner === "player1"? "Player1": "Player2"
          } wins! 🏆
          </h2>
          <p>Well played</p>
          <div className="button-group">
            <button onClick={handleRestart}>Play Again</button>
            <button onClick={handleMenu}>Return to Menu</button>
            <button onClick={handleNewGame}>New Game</button>
          </div>
      </div>
    </div>
  )
}

export default WinnerModal;