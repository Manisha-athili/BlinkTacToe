
import '../styles/WinnerModal.css';

const WinnerModal = ({ winner }) => {
  const handleRestart = () => {
    window.location.href = '/';
  };

  return (
    <div className="modal-overlay">
      <div className="winner-modal">
        <div className="sparkles">✨ 🎉 ✨</div>
        <h2>{winner === 'player1' ? 'Player 1' : 'Player 2'} Wins! 🏆</h2>
        <p>Well played!</p>
        <button onClick={handleRestart}>Play Again</button>
      </div>
    </div>
  )
}
export default WinnerModal