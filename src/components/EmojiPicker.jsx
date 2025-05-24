import { useState } from "react";
import '../styles/EmojiPicker.css';

const categories = {
    Animals : ['🐶', '🐱', '🐵', '🐰'],
    Food : ['🍕', '🍟', '🍔', '🍩'],
    Sports : ['⚽', '🏀', '🏈', '🎾'],
    Nature : ['🌲','🍃','🌻','🍂','🌈'],
    Love: ['💗','💖','💘','💛','💝'],
    AI: ['🤖', '👾', '🛸', '🧠'] 

};

const Emojipicker=({mode,onStart})=>{
   const [player1Cat,setPlayer1Cat] = useState('');
   const [player2Cat,setPlayer2Cat] = useState('');

   const handleStart = ()=> {
    if(!player1Cat){
        alert('Please select a category for Player 1.')
        return
    }

    if(mode === 'pvp'){
        if(!player1Cat || player1Cat === player2Cat){
            alert("Please select a different category for Player 2.")
            return;
        }
        onStart({
            player1: categories[player1Cat],
            player2 : categories[player2Cat]
        })
    }else{
        onStart({
            player1: categories[player1Cat],
            player2: categories['AI']
        })
    }
   }
    return(
        <>
        <div className="emoji-picker">
            <div>
                <label htmlFor="play1">Player 1 Category:</label>
            <select
            value={player1Cat}
            onChange={(e)=>setPlayer1Cat(e.target.value)}>
                <option value="">Select</option>
                {
                    Object.keys(categories).filter((categorie)=>
                        categorie !== player2Cat &&  categorie !== 'AI').map((categorie)=>(
                        <option key={categorie} value={categorie}>{categorie}</option>
                    ))
                }
            </select>
            </div>

        
        {
            mode === 'pvp' && (
                <div>
                     <label>Player 2 Category:</label>
                      <select onChange={(e) => setPlayer2Cat(e.target.value)}>
                    <option value="">Select</option>
                    {Object.keys(categories).filter((cat)=> cat !== player1Cat && cat !== 'AI').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
            </select>
                </div>
            )
        }

         <button onClick={handleStart}>Start Game</button>
        </div>
        </>
    )
}

export default Emojipicker