import { useEffect, useState } from 'react';
import '../styles/WinnerModal.css';

const WinnerModal = ({ winner, mode }) => {
  const [sparkles, setSparkles] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Determine emoji based on winner and mode
  const getWinnerEmoji = () => {
    return {
      player1: '😎',
      player2: mode === 'pvp' ? '🤠' : '🤖',
    }[winner];
  };

  // Determine winner text
  const getWinnerText = () => {
    if (winner === 'player1') return 'Player 1 Wins!';
    return mode === 'pvp' ? 'Player 2 Wins!' : 'AI Wins!';
  };

  // Trigger sparkles on mount
  useEffect(() => {
    setShowConfetti(true);
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: `${Math.random() * 2 + 2}s`,
        emoji: ['✨', '🌟', '⭐', '🎉', '🏆'][Math.floor(Math.random() * 5)],
      };
      setSparkles((prev) => [...prev.slice(-20), newSparkle]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleRestart = () => (window.location.href = '/game');
  const handleMenu = () => (window.location.href = '/');
  const handleNewGame = () => {
    localStorage.removeItem('playerEmojis');
    window.location.href = '/';
  };

  return (
    <div className="modal-overlay">
      <div className="winner-modal">
        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                }}
              />
            ))}
          </div>
        )}

        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="floating-sparkle"
            style={{
              left: `${sparkle.left}%`,
              animationDuration: sparkle.animationDuration,
            }}
          >
            {sparkle.emoji}
          </span>
        ))}

        <div className="winner-content">
          <div className="winner-emoji bounce">{getWinnerEmoji()}</div>
          <h2 className="winner-title">
            {getWinnerText()} <span className="trophy">🏆</span>
          </h2>
          <p className="celebration-text">Well played!</p>

          <div className="button-group">
            <button onClick={handleRestart}>🔄 Play Again</button>
            <button onClick={handleMenu}>🏠 Main Menu</button>
            <button onClick={handleNewGame}>🆕 New Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
