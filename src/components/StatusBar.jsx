

const StatusBar =({currentPlayer})=>{
    return (
        <div className="status-bar">
    <h3>Current Turn: {
    currentPlayer === 'player1' ? 'Player 1' : 'Player 2'
    }</h3>
  </div>
    )
}

export default StatusBar