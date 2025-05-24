import '../styles/StatusBar.css';

const StatusBar = ({ currentPlayer, mode }) => {
  const getPlayerLabel = () => {
    if (currentPlayer === 'player1') return 'Player 1';
    return mode === 'pvp' ? 'Player 2' : 'Player AI';
  };

  return (
    <div className="status-bar">
      <h3>Current Turn: {getPlayerLabel()}</h3>
    </div>
  );
};

export default StatusBar;
