import WinnerModel from "./WinnerModal"


const GameBoard=()=>{
    return(
        <>
        <div className="gameplay-container">
            <div>
                {playerEmojis.player1 }
            </div>
            <div></div>
            <div></div>
            {
                winner && <WinnerModel winner={WinnerModel}/>
            }
        </div>
        </>
    )
}

export default GameBoard