import { useState } from "react";

const categories = {
    Animals : ['🐶', '🐱', '🐵', '🐰'],
    Food : ['🍕', '🍟', '🍔', '🍩'],
    Sports : ['⚽', '🏀', '🏈', '🎾']
};

const Emojipicker=({onStart})=>{
   const [player1,setPlayer1] = useState('');
   const [player2,setPlayer2] = useState('');


    return(
        <>
        <div>
            <label htmlFor="play1">Player 1 Category:</label>
            <select
            
            onChange={(e)=>setPlayer1(e.target.value)}>
                <option value="">Select</option>
                {
                    Object.keys(categories).map((categorie)=>(
                        <option key={categorie}>{categorie}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <label>Player  Category:</label>
            <select
                onChange={(e)}
            ></select>

        </div>

        </>
    )
}

export default Emojipicker