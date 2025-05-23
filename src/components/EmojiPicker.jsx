import { useState } from "react";

const categories = {
    Animals : ['🐶', '🐱', '🐵', '🐰'],
    Food : ['🍕', '🍟', '🍔', '🍩'],
    Sports : ['⚽', '🏀', '🏈', '🎾'],
    Nature : ['🌲','🍃','🌻','🍂','🌈'],
    Love: ['💗','💖','💘','💛','💝']

};

const Emojipicker=({onStart})=>{
   const [player1,setPlayer1] = useState('');
   const [player2,setPlayer2] = useState('');

   const handleStart = ()=> {
    if(player1 && player2 && player1 != player2){
        onStart({
            player1: categories[player1],
            player2: categories[player2]

        })  
    }else {
            alert('Please select categories Properly')
        }
   }

    return(
        <>
        <div>
            <label htmlFor="play1">Player 1 Category:</label>
            <select
            
            onChange={(e)=>setPlayer1(e.target.value)}>
                <option value="">Select</option>
                {
                    Object.keys(categories).filter((cat)=> cat !== player2).map((categorie)=>(
                        <option key={categorie}>{categorie}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <label>Player 2 Category:</label>
        <select onChange={(e) => setPlayer2(e.target.value)}>
          <option value="">Select</option>
          {Object.keys(categories).filter((cat)=> cat !== player1).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
         <button onClick={handleStart}>Start Game</button>
        </div>

        </>
    )
}

export default Emojipicker