import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instructions from "../components/Instructions";
import '../styles/CategorySelection.css';
import Emojipicker from "../components/EmojiPicker";



const CategorySelection = () => {
    const [playerEmojis, setPlayerEmojis] = useState(null)
    const navigate = useNavigate();

    const handleStart = (selectedEmojis) =>{
        setPlayerEmojis(selectedEmojis);
        localStorage.setItem('playerEmojis',JSON.stringify(selectedEmojis));
        navigate('/game');
    }
    return(
        <div className="category-selection-container">
            <div className="left-section">
                <Emojipicker onStart={handleStart}/>
            </div>
            <div className="right-section gradient-bg">
                <Instructions/>
            </div>
        </div>
    )
}

export default CategorySelection;